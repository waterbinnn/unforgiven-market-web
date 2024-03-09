import { authManage } from '@/service';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { cookies } from 'next/headers';

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
          const res = await authManage.signIn(credentials);

          if (!res || res.FAIL_Message) {
            return null;
          }

          cookies().set('USER_TYPE', res['user_type'], { path: '/' });

          return {
            id: res.id,
            token: res.token,
            user_type: res.user_type,
          };
        } catch (err) {
          console.log(err);

          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      user && (token.user = user);

      return Promise.resolve(token);
    },
    session: async ({ session, token }) => {
      /*@ts-ignore */
      session = token.user;
      return Promise.resolve(session);
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
