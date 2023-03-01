import { prisma } from '@my-coin/database';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { env } from '../../../env/server.mjs';
import { randUserName } from '@ngneat/falso';

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
            id: true,
            email: true,
            name: true,
            image: true,
          },
        });

        if (userRes) {
          session.user.emailVerified = userRes.emailVerified;
          session.user.email = userRes.email;
          session.user.name = userRes.name;
          session.user.image = userRes.image;

          if (!userRes.name) {
            let taken = true;
            let name = '';
            do {
              name = randUserName();
              // eslint-disable-next-line no-await-in-loop
              const count = await prisma.user.count({
                where: {
                  name,
                },
              });

              taken = count !== 0;
            } while (taken);

            await prisma.user.update({
              where: {
                id: user.id,
              },
              data: {
                name,
              },
            });

            session.user.name = name;
          }
        }
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
