import { Input } from "@/components/Input";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

import prismaClient from "@/lib/prisma";
import Link from "next/link";

export default async function NewTicket() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const customers = await prismaClient.customer.findMany({
    where: {
      userId: session.user.id,
    },
  });

  async function onSubmit(formValues: FormData) {
    "use server";

    const name = formValues.get("name");
    const description = formValues.get("description");
    const customerId = formValues.get("customer");
    console.log(name, description, customerId, "nome");
    if (!name || !description || !customerId) return;

    await prismaClient.ticket.create({
      data: {
        name: name as string,
        description: description as string,
        customerId: customerId as string,
        status: "aberto",
        userId: session?.user.id,
      },
    });
    console.log("Chamado aberto com sucesso!");
    redirect("/dashboard");
  }

  return (
    <main className="w-full flex flex-col mt-9 mb-2">
      <div className="w-full flex items-center justify-between px-4">
        <h1 className="font-bold text-white text-3xl">Criar novo chamado</h1>
        <Link
          className=" hover:bg-indigo-600 font-bold transition-all duration-300 h-10 px-4 bg-indigo-500 flex items-center justify-center rounded-xl text-sm"
          href={"/dashboard/"}
        >
          Voltar
        </Link>
      </div>
      <form
        action={onSubmit}
        className="w-full flex flex-col mt-6 px-2 gap-4 max-w-2xl mx-auto"
      >
        <div className="w-full flex flex-col">
          <label className="font-medium text-white text-sm">
            Descreva o problema
          </label>
          <input
            name="name"
            className="w-full h-14 md:h-11 outline-none bg-transparent text-white border border-neutral-800 rounded-xl px-2"
            placeholder="Crie um título para o chamado"
            required
          />
        </div>
        <div className="w-full flex flex-col">
          <label className="font-medium text-white text-sm">
            Descreva o problema
          </label>
          <textarea
            name="description"
            className="outline-none w-full border border-neutral-800 rounded-xl px-2 pt-2 mb-2 h-24 resize-none bg-transparent"
            placeholder="Nos informe qual o seu problema aqui :)"
            required
          ></textarea>
        </div>
        <div className="w-full flex flex-col">
          {customers.length !== 0 && (
            <>
              <label className="font-medium text-white text-sm">
                Selecione o cliente
              </label>
              <select
                name="customer"
                className="border border-neutral-800 rounded-xl px-2 w-full h-14 md:h-11 outline-none bg-transparent text-white"
              >
                {customers.map((customer) => (
                  <option
                    key={customer.id}
                    className="bg-neutral-800 text-white"
                    value={customer.id}
                  >
                    {customer.name}
                  </option>
                ))}
              </select>
            </>
          )}

          {customers.length === 0 && (
            <Link
              className="flex items-end gap-1 font-bold"
              href={"/dashboard/customer/create"}
            >
              Você ainda não possui clientes,
              <span className="text-indigo-500 underline">
                Cadastrar cliente
              </span>
            </Link>
          )}
        </div>
        <button
          className="disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100 bg-indigo-500 my-4 px-2 items-center justify-center text-white h-11 rounded-xl active:scale-95 duration-300 transition-all"
          disabled={customers.length === 0}
          type="submit"
        >
          Cadastrar
        </button>
      </form>
    </main>
  );
}
