import CredentialsProvider from 'next-auth/providers/credentials';

import type { NextAuthOptions } from 'next-auth';
import { prisma } from './prisma';
import { compare } from 'bcryptjs';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/?login=true',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email (provide your email)',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          return null;
        }

        const existingUser = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        const isMatchPassword = await compare(
          credentials.password,
          existingUser.password,
        );

        if (!isMatchPassword) return null;

        return {
          id: `${existingUser.id}`,
          name: existingUser.name,
          email: existingUser.email,
        };
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      console.log('[SESSION_USER]', session);
      return {
        ...session,
        user: {
          ...session.user,
          name: token.name,
        },
      };
    },
    jwt: async ({ token, user }) => {
      console.log('[TOKEN_USER]', token);
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          username: user.name,
          id: u.id,
        };
      }
      return token;
    },
  },
};

// in case you're stuck, watch this: https://www.youtube.com/watch?v=bicCg4GxOP8
