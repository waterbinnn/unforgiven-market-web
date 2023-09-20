import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      token: string;
      user_type: string;
    };
  }
}
