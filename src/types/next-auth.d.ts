// next-auth.d.ts
import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    _id?: string;
  }

  interface Session extends DefaultSession {
    user: {
      _id?: string;
      name?: string;
      email?: string;
      image?: string;
    } & DefaultSession['user'];
  }
}
