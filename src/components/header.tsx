import { LogOut, User } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="w-full flex items-center px-4 shadow-md py-4 h-20 max-w-7xl mx-auto">
      <div className="w-full flex items-center justify-between">
        <Link href={"/"}>
          <h1 className="text-white font-bold text-2xl md:text-3xl hover:tracking-widest transition-all duration-300">
            <span className="text-[#6C63FF]">_dev</span>control
          </h1>
        </Link>

        <div className="flex items-baseline gap-4">
          <Link href={"/dashboard"}>
            <User size={26} color="#ffffff" />
          </Link>
          <Link href={"/dashboard"}>
            <LogOut size={26} color="#ffffff" />
          </Link>
        </div>
      </div>
    </header>
  );
}
