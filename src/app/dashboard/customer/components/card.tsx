"use client";
import { deleteCustomer } from "@/services/customer";
import { Customer } from "@/utils/customer.type";
import { useRouter } from "next/navigation";

export function Card({ customer }: { customer: Customer }) {
  const router = useRouter();

  async function onDelete() {
    await deleteCustomer(customer.id);
    router.refresh();
  }

  return (
    <article className="w-full md:max-w-[400px] flex flex-col bg-neutral-900 border border-neutral-800 rounded-2xl p-4 gap-2 hover:scale-105 duration-300 transition-all">
      <p className="text-sm">
        <strong>Nome:</strong> {customer.name}
      </p>
      <p className="text-sm">
        <strong>Email:</strong> {customer.email}
      </p>
      <p className="text-sm">
        <strong>Telefone:</strong> {customer.phone}
      </p>
      <button
        onClick={onDelete}
        className="text-white h-8 px-4 mt-2 text-xs font-bold rounded-xl bg-indigo-500 self-start"
      >
        Excluir
      </button>
    </article>
  );
}
