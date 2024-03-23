import { authManage } from '@/service';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/signin',
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {},

      async authorize(credentials) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        if (!username || !password) {
          return null;
        }

        try {
          const { data } = await authManage.signIn(credentials);

          if (!data) {
            return null;
          }

          return {
            id: data.id,
            token: data.token,
            user_type: data.user_type,
          };
        } catch (err) {
          console.log(err);

          return null;
        }
      },
    }),
  ],

  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      /*@ts-ignore */
      session = token.user;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  session: {
    strategy: 'jwt',
  },
};
