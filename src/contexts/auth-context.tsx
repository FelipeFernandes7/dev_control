"use client";

import { authOptions } from "@/lib/auth";
import { getServerSession, Session } from "next-auth";
import { redirect } from "next/navigation";
import { createContext, ReactNode, useContext } from "react";

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextProps = {
  session: Session | null;
};

const AuthContext = createContext({} as AuthContextProps);

export async function AuthProvider({ children }: AuthProviderProps) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <AuthContext.Provider
      value={{
        session,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
