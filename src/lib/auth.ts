import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { hashSync, compareSync } from 'bcryptjs';
import { validateLogin, getUser, getRole, seedDefaultData } from './db';
import { checkRateLimit, consumeRateLimit } from './rate-limit';

// Hardcoded admin accounts — emergency fallback only.
// Behaviour: if a user with the same id exists in the DB, the DB record wins
// (so admins can be deactivated via the panel). Hardcoded creds are only used
// when the DB entry is missing (e.g. KV wiped, fresh deploy before seed).
// In production, set ADMIN_CODE_DIEGO, ADMIN_CODE_YULIA, ADMIN_CODE_STANISLAV env vars.
type HardcodedAdmin = { name: string; codeHash: string; lang: 'es' | 'ru'; roleId: string };
const HARDCODED_ADMINS: Record<string, HardcodedAdmin> = {};

// Initialize hardcoded admins from environment variables (hashed at startup)
function initHardcodedAdmins() {
  const adminDefs: { id: string; name: string; envKey: string; lang: 'es' | 'ru' }[] = [
    { id: 'diego', name: 'Diego', envKey: 'ADMIN_CODE_DIEGO', lang: 'es' },
    { id: 'yulia', name: 'Yulia', envKey: 'ADMIN_CODE_YULIA', lang: 'ru' },
    { id: 'stanislav', name: 'Stanislav', envKey: 'ADMIN_CODE_STANISLAV', lang: 'ru' },
  ];
  for (const def of adminDefs) {
    const code = process.env[def.envKey];
    if (code && code.length >= 6) {
      HARDCODED_ADMINS[def.id] = {
        name: def.name,
        codeHash: hashSync(code, 10),
        lang: def.lang,
        roleId: 'admin',
      };
    }
  }
}
initHardcodedAdmins();

// Rate-limit parameters for login. Key scheme: ratelimit:login:{userId}
const LOGIN_MAX_ATTEMPTS = 5;
const LOGIN_WINDOW_SECONDS = 15 * 60; // 15 minutes

// Auto-seed on first use
let seeded = false;
async function ensureSeeded() {
  if (seeded) return;
  try {
    await seedDefaultData();
  } catch { /* ignore if KV not available */ }
  seeded = true;
}

// Ensure NEXTAUTH_SECRET is set in production
if (process.env.NODE_ENV === 'production' && !process.env.NEXTAUTH_SECRET) {
  throw new Error('NEXTAUTH_SECRET environment variable is required in production');
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Code',
      credentials: {
        userId: { label: 'Usuario', type: 'text' },
        code: { label: 'Codigo', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.userId || !credentials?.code) return null;
        const userId = (credentials.userId as string).toLowerCase().trim();
        const code = credentials.code as string;

        // Validate input length to prevent abuse
        if (userId.length > 50 || code.length > 50) return null;

        // KV-backed rate limit: prevents bypass via serverless cold starts.
        const rlKey = `ratelimit:login:${userId}`;
        const rl = await checkRateLimit(rlKey, LOGIN_MAX_ATTEMPTS, LOGIN_WINDOW_SECONDS);
        if (!rl.allowed) {
          // Too many attempts — fail closed until window expires.
          return null;
        }

        await ensureSeeded();

        // DB wins over hardcoded. Only fall back to hardcoded when the user
        // doesn't exist in the DB (emergency access before/after seed wipe).
        const dbUser = await getUser(userId);

        if (dbUser) {
          const validated = await validateLogin(userId, code);
          if (!validated) {
            await consumeRateLimit(rlKey, LOGIN_MAX_ATTEMPTS, LOGIN_WINDOW_SECONDS);
            return null;
          }
          return { id: validated.id, name: validated.name, email: `${validated.id}@neomaaa.internal` };
        }

        // No DB record — try hardcoded fallback
        const hardcoded = HARDCODED_ADMINS[userId];
        if (hardcoded && compareSync(code, hardcoded.codeHash)) {
          return { id: userId, name: hardcoded.name, email: `${userId}@neomaaa.internal` };
        }

        // Neither DB nor hardcoded matched — count as failed attempt
        await consumeRateLimit(rlKey, LOGIN_MAX_ATTEMPTS, LOGIN_WINDOW_SECONDS);
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const userId = user.id!;
        // DB wins. If DB has the user, use DB role/flags regardless of hardcoded.
        const dbUser = await getUser(userId);
        if (dbUser) {
          const role = await getRole(dbUser.roleId);
          token.userId = userId;
          token.roleId = dbUser.roleId;
          token.isAdmin = role?.isAdmin || false;
          token.lang = dbUser.lang;
          token.mustChangeCode = dbUser.mustChangeCode === true;
          return token;
        }
        // Fallback: hardcoded admin (no DB record)
        const hardcoded = HARDCODED_ADMINS[userId];
        if (hardcoded) {
          token.userId = userId;
          token.roleId = hardcoded.roleId;
          token.isAdmin = true;
          token.lang = hardcoded.lang;
          token.mustChangeCode = false;
          return token;
        }
        // Shouldn't reach here (authorize would've returned null), but be safe
        token.userId = userId;
        token.roleId = 'principal';
        token.isAdmin = false;
        token.lang = 'es';
        token.mustChangeCode = false;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).userId = token.userId;
        (session.user as any).roleId = token.roleId;
        (session.user as any).isAdmin = token.isAdmin;
        (session.user as any).lang = token.lang;
        (session.user as any).mustChangeCode = token.mustChangeCode === true;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    // Reduced from 7d to 1h so deactivations / role changes take effect within
    // one refresh window without requiring per-request DB lookups in middleware.
    // Combined with isActive check in middleware, the effective revocation
    // window is ~0s for page nav (middleware) and <=1h for API-only sessions.
    maxAge: 60 * 60, // 1 hour
  },
  secret: process.env.NEXTAUTH_SECRET || (process.env.NODE_ENV === 'development' ? 'neomaaa-dev-secret-local-only' : undefined),
});
