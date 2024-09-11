"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function HeaderDashboard() {
  const pathname = usePathname();

  return (
    <header className="w-full bg-indigo-500 my-4 p-3 flex items-center">
      <Link
        href={"/dashboard"}
        className={`text-white text-sm hover:tracking-wide transition-all duration-300 flex items-center ${
          pathname === "/dashboard" ? "font-bold" : "text-medium"
        }`}
      >
        Chamados
        <ChevronRight size={20} color="#fff" />
      </Link>
      <Link
        className={`text-white text-sm hover:tracking-wide transition-all duration-300 flex items-center ${
          pathname === "/dashboard/customer" ? "font-bold" : "text-medium"
        }`}
        href={"/dashboard/customer"}
      >
        Clientes
        <ChevronRight size={20} color="#fff" />
      </Link>
      {pathname === "/dashboard/create" && (
        <Link
          className={`text-white text-sm hover:tracking-wide transition-all duration-300 flex items-center font-bold`}
          href={"/dashboard/create"}
        >
          Abrir novo chamado
          <ChevronRight size={20} color="#fff" />
        </Link>
      )}
      {pathname === "/dashboard/customer/create" && (
        <Link
          className={`text-white text-sm hover:tracking-wide transition-all duration-300 flex items-center font-bold`}
          href={"/dashboard/customer/create"}
        >
          Cadastrar novo cliente
          <ChevronRight size={20} color="#fff" />
        </Link>
      )}
    </header>
  );
}
