import { prisma } from '@my-coin/database';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { env } from '../../../env/server.mjs';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: env.EMAIL_SERVER_HOST,
        port: env.EMAIL_SERVER_PORT,
        auth: {
          user: env.EMAIL_SERVER_USER,
          pass: env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: env.EMAIL_FROM,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;

        const userRes = await prisma.user.findUnique({
          where: { id: user.id },
          select: {
            emailVerified: true,
            role: true,
          },
        });

        if (userRes) {
          session.user.emailVerified = userRes.emailVerified;
          session.user.role = userRes.role;
        }
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
