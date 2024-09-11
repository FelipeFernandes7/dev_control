import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Card } from "./components/card";

export default async function Customer() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <main className="w-full flex flex-col mt-9 mb-2">
      <div className="w-full flex items-center justify-between px-4">
        <h1 className="font-bold text-white text-3xl">Meus Clientes</h1>
        <Link
          className=" hover:bg-indigo-600 font-bold transition-all duration-300 h-10 px-4 bg-indigo-500 flex items-center justify-center rounded-xl text-sm"
          href={"/dashboard/customer/create"}
        >
          Novo Cliente
        </Link>
      </div>
      <section className="w-full flex items-center justify-center md:justify-normal flex-wrap gap-4 px-2 mt-5">
        <Card />
        <Card />
        <Card />
      </section>
    </main>
  );
}
