import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Ticket } from "./components/ticket";
import peace from "@/assets/undraw/peace.svg";
import Link from "next/link";
import Image from "next/image";
import prismaClient from "@/lib/prisma";
import { ButtonRefresh } from "./components/refresh";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const tickets = await prismaClient.ticket.findMany({
    where: {
      customer: {
        userId: session.user.id,
      },
      status: "aberto",
    },
    include: {
      customer: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return (
    <main className="w-full flex flex-col mt-9 mb-2">
      <div className="w-full flex items-center justify-between px-4">
        <h1 className="font-bold text-white text-3xl">Chamados</h1>
        <div className="flex items-center gap-2">
          <ButtonRefresh />
          <Link
            className=" hover:bg-indigo-600 font-bold transition-all duration-300 h-10 px-4 bg-indigo-500 flex items-center justify-center rounded-xl text-sm"
            href={"/dashboard/create"}
          >
            Abrir chamado
          </Link>
        </div>
      </div>
      <div className="w-full flex flex-col items-center px-2 my-5">
        <table className="min-w-full">
          <thead>
            <tr className="bg-neutral-900 h-10">
              <th className="font-medium text-sm text-left px-2">CLIENTE</th>
              <th className="font-medium text-sm text-left px-2">DATA</th>
              <th className="font-medium text-sm text-left px-2">STATUS</th>
              <th className="font-medium text-sm text-left px-2">#</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <Ticket
                key={ticket.id}
                ticket={ticket}
                customer={ticket.customer}
              />
            ))}
          </tbody>
        </table>
        {tickets.length === 0 && (
          <div className="w-full flex flex-col items-center justify-center mt-6">
            <h2 className="text-2xl font-medium">Nenhum ticket aberto</h2>
            <h1 className="font-bold text-3xl mb-8 text-indigo-500 md:text-4xl">
              foi encontrado!
            </h1>
            <Image
              className="max-w-sm md:max-w-xl"
              src={peace}
              alt="Imagem de um cliente"
              width={300}
            />
          </div>
        )}
      </div>
    </main>
  );
}
