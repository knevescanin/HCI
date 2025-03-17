import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const authHandler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),

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

    async signIn({ user, account, profile }) {
      console.log('Google Profile:', profile);
    
      if (account?.provider === "google" || account?.provider === "facebook") {
        const fullName = profile?.name?.split(" ") || [];
        const firstName = fullName[0] || "";
        const lastName = fullName.slice(1).join(" ") || "";
    
        // Check if user exists
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email ?? "" },
        });
    
        let currentUser;
        if (!existingUser) {
          // Create a new user and store user information
          currentUser = await prisma.user.create({
            data: {
              email: user.email ?? "",
              firstName,
              lastName,
              image: user.image,
            },
          });
        } else {
          currentUser = existingUser;
          // Update user information if necessary
          await prisma.user.update({
            where: { email: user.email ?? "" },
            data: {
              firstName: currentUser.firstName || firstName,
              lastName: currentUser.lastName || lastName,
            },
          });
        }
    
        // Check if the OAuth account is already linked
        const accountExists = await prisma.account.findUnique({
          where: {
            provider_providerAccountId: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          },
        });
    
        if (!accountExists) {
          // Create the new account and link it to the user
          await prisma.account.create({
            data: {
              userId: currentUser.id, // Ensure that the correct userId is used
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          });
        }
      }
    
      return true;
    },
    
    
    async session({ session, token }: { session: any, token: any }) {
      if (token) {
        session.user.id = token.id;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.email = token.email; 
        session.user.image = token.image || "";
      }
      return session;
    },
    async jwt({ token, user }: { token: any, user: any }) {
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.email = user.email;
        token.image = user.image || "";
      }
      return token;
    },
  },
});

// Named exports for GET and POST
export const GET = authHandler;
export const POST = authHandler;
