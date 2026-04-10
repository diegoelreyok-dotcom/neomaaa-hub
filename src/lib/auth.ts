import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { validateLogin, getUser, getRole, seedDefaultData } from './db';

// Hardcoded admin accounts — always work regardless of database state
const HARDCODED_ADMINS: Record<string, { name: string; code: string; lang: 'es' | 'ru'; roleId: string }> = {
  diego: { name: 'Diego', code: '010101', lang: 'es', roleId: 'admin' },
  yulia: { name: 'Yulia', code: '020202', lang: 'ru', roleId: 'admin' },
  stanislav: { name: 'Stanislav', code: '030303', lang: 'ru', roleId: 'admin' },
};

// Auto-seed on first use
let seeded = false;
async function ensureSeeded() {
  if (seeded) return;
  try {
    await seedDefaultData();
  } catch { /* ignore if KV not available */ }
  seeded = true;
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

        // Check hardcoded admins first (always works)
        const hardcoded = HARDCODED_ADMINS[userId];
        if (hardcoded && hardcoded.code === code) {
          return { id: userId, name: hardcoded.name, email: `${userId}@neomaaa.internal` };
        }

        // Then try database
        await ensureSeeded();
        const user = await validateLogin(userId, code);
        if (!user) return null;
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
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || 'neomaaa-dev-secret-change-in-prod',
});
