import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { validateLogin, getUser, getRole } from './db';

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
        const user = await validateLogin(
          credentials.userId as string,
          credentials.code as string
        );
        if (!user) return null;
        return { id: user.id, name: user.name, email: `${user.id}@neomaaa.internal` };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await getUser(user.id!);
        const role = dbUser ? await getRole(dbUser.roleId) : null;
        token.userId = user.id;
        token.roleId = dbUser?.roleId;
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
