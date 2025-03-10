import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const authHandler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log('Missing email or password');
          throw new Error('Missing email or password');
        }
      
        // Find user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
      
        if (!user || !user.password) {
          console.log('User not found or missing password');
          throw new Error('User not found');
        }
      
        // Compare password
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          console.log('Invalid password');
          throw new Error('Invalid password');
        }
      
        console.log('User authenticated successfully:', user);
        return { id: user.id, name: `${user.firstName}`, email: user.email };

      }
      ,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }: { session: any, token: any }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
    async jwt({ token, user }: { token: any, user: any }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
});

// Named exports for GET and POST
export const GET = authHandler;
export const POST = authHandler;
