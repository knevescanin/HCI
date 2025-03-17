import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      firstName?: string;
      lastName?: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    id: string;
    firstName?: string;
    lastName?: string;
  }
}
