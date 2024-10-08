import { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import GoogleProvider from "next-auth/providers/google";
import prisma from "./prisma";

type User = {
  id: string;
  name: string;
  email: string;
};

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      session.user = {
        ...session.user,
        id: user.id,
      } as User;

      return session;
    },
  },
};
