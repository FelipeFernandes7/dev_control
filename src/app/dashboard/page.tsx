import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Ticket } from "./components/ticket";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <main className="w-full flex flex-col mt-9 mb-2">
      <div className="w-full flex items-center justify-between px-4">
        <h1 className="font-bold text-white text-3xl">Chamados</h1>
        <Link
          className=" hover:bg-indigo-600 font-bold transition-all duration-300 h-10 px-4 bg-indigo-500 flex items-center justify-center rounded-xl text-sm"
          href={"/dashboard/create"}
        >
          Abrir chamado
        </Link>
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
            <Ticket />
            <Ticket />
            <Ticket />
          </tbody>
        </table>
      </div>
    </main>
  );
}
