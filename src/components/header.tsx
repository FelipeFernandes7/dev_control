"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Loader, LogOut } from "lucide-react";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  const { status } = useSession();

  async function handleLogin() {
    await signIn();
  }

  async function handleLogOut() {
    await signOut();
  }

  return (
    <header className="w-full flex items-center px-4 shadow-md py-4 h-20 ">
      <div className="w-full flex items-center justify-between">
        <Link href={"/"}>
          <h1 className="text-white font-bold text-2xl md:text-3xl hover:tracking-widest transition-all duration-300">
            <span className="text-[#6C63FF]">_dev</span>control
          </h1>
        </Link>

        {status === "loading" && (
          <button className="animate-spin">
            <Loader size={26} color="#6C63FF" />
          </button>
        )}

        {status === "unauthenticated" && (
          <button
            className="hover:bg-indigo-600 transition-all ease-linear duration-300 bg-indigo-500 font-bold text-xs h-10 px-4 rounded-xl"
            onClick={handleLogin}
          >
            Fazer Login
          </button>
        )}

        {status === "authenticated" && (
          <div className="flex items-baseline gap-4">
            <Link
              className={cn(
                "flex transition-all duration-300 hover:bg-neutral-800 px-4 h-10 items-center justify-center rounded-xl",
                pathname === "/dashboard" ? "bg-neutral-800" : "bg-transparent",
              )}
              href={"/dashboard"}
            >
              Dashboard
            </Link>
            <button
              className="transition-all duration-300 hover:bg-neutral-800 h-10 text-indigo-500 flex items-center justify-center gap-2 bg-transparent px-3 rounded-xl"
              onClick={handleLogOut}
            >
              sair
              <LogOut size={18} color="#6C63FF" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
