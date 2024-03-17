import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const authOptions: AuthOptions = {
    session: {
      strategy: "jwt",
    },
    adapter: PrismaAdapter(prisma) as any,
    providers: [
      GoogleProvider({
        clientId: process.env.AUTH_GOOGLE_ID!,
        clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      }),
    ],
    callbacks: {
      async jwt({ token, user }) {
        return { ...token, ...user };
      },
      async session({ session, token, user }) {
        session.user = { ...session.user, id: token.id };
        return session;
      },
    },
  };