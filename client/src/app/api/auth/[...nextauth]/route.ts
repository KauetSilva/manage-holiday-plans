import { authOptions } from "@/lib/auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// export const authOptions: AuthOptions = {
//   session: {
//     strategy: "jwt",
//   },
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.AUTH_GOOGLE_ID!,
//       clientSecret: process.env.AUTH_GOOGLE_SECRET!,
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       console.log("jwttt", token);
//       return { ...token, ...user };
//     },
//     async session({ session, token, user }) {
//       console.log('tokeeen', token)
//       session.user = { ...session.user, id: token.id };
//       console.log("session testeee", session.user);
//       return session;
//     },
//   },
// };

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
