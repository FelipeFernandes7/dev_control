import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Card } from "./components/card";

import empty from "@/assets/undraw/empty.svg";
import Link from "next/link";
import Image from "next/image";
import prismaClient from "@/lib/prisma";

export default async function Customer() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }
  const customers = await prismaClient.customer.findMany({
    where: {
      userId: session.user.id,
    },
  });

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
        {customers &&
          customers.map((res) => <Card key={res.id} customer={res} />)}
      </section>
      {customers.length === 0 && (
        <div className="w-full flex flex-col items-center justify-center mt-6 px-2">
          <h2 className="text-2xl font-medium mb-2">Oops...</h2>
          <h1 className="font-medium text-3xl text-center mb-8 text-gray-400 md:text-4xl">
            parece que ainda não há clientes cadastrados
          </h1>
          <Image
            className="max-w-sm md:max-w-xl"
            src={empty}
            alt="Imagem de um cliente"
            width={300}
          />
        </div>
      )}
    </main>
  );
}
