import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    id: number;
    token: string;
    user_type: string;
  }
}
