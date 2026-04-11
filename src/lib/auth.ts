import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { hashSync, compareSync } from 'bcryptjs';
import { validateLogin, getUser, getRole, seedDefaultData } from './db';

// Hardcoded admin accounts — always work regardless of database state
// In production, set ADMIN_CODE_DIEGO, ADMIN_CODE_YULIA, ADMIN_CODE_STANISLAV env vars
// Falls back to database-only auth if env vars are not set
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

// Simple in-memory rate limiter for login attempts
const loginAttempts: Map<string, { count: number; lastAttempt: number }> = new Map();
const MAX_LOGIN_ATTEMPTS = 5;
const LOGIN_LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes

function checkRateLimit(userId: string): boolean {
  const now = Date.now();
  const entry = loginAttempts.get(userId);
  if (!entry) return true;
  // Reset if lockout period has passed
  if (now - entry.lastAttempt > LOGIN_LOCKOUT_MS) {
    loginAttempts.delete(userId);
    return true;
  }
  return entry.count < MAX_LOGIN_ATTEMPTS;
}

function recordFailedLogin(userId: string): void {
  const now = Date.now();
  const entry = loginAttempts.get(userId);
  if (!entry || now - entry.lastAttempt > LOGIN_LOCKOUT_MS) {
    loginAttempts.set(userId, { count: 1, lastAttempt: now });
  } else {
    entry.count += 1;
    entry.lastAttempt = now;
  }
}

function clearLoginAttempts(userId: string): void {
  loginAttempts.delete(userId);
}

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

        // Rate limit check
        if (!checkRateLimit(userId)) {
          return null; // Too many failed attempts
        }

        // Check hardcoded admins first (always works)
        const hardcoded = HARDCODED_ADMINS[userId];
        if (hardcoded && compareSync(code, hardcoded.codeHash)) {
          clearLoginAttempts(userId);
          return { id: userId, name: hardcoded.name, email: `${userId}@neomaaa.internal` };
        }

        // Then try database
        await ensureSeeded();
        const user = await validateLogin(userId, code);
        if (!user) {
          recordFailedLogin(userId);
          return null;
        }
        clearLoginAttempts(userId);
        return { id: user.id, name: user.name, email: `${user.id}@neomaaa.internal` };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Check hardcoded first
        const hardcoded = HARDCODED_ADMINS[user.id!];
        if (hardcoded) {
          token.userId = user.id;
          token.roleId = hardcoded.roleId;
          token.isAdmin = true;
          token.lang = hardcoded.lang;
          return token;
        }
        // Then check database
        const dbUser = await getUser(user.id!);
        const role = dbUser ? await getRole(dbUser.roleId) : null;
        token.userId = user.id;
        token.roleId = dbUser?.roleId || 'principal';
        token.isAdmin = role?.isAdmin || false;
        token.lang = dbUser?.lang || 'es';
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).userId = token.userId;
        (session.user as any).roleId = token.roleId;
        (session.user as any).isAdmin = token.isAdmin;
        (session.user as any).lang = token.lang;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days (was 30 — reduced for financial platform)
  },
  secret: process.env.NEXTAUTH_SECRET || (process.env.NODE_ENV === 'development' ? 'neomaaa-dev-secret-local-only' : undefined),
});
