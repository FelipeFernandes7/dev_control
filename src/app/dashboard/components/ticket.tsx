"use client";

import { cn } from "@/lib/utils";
import { changeStatus } from "@/services/ticket";
import { Customer } from "@/utils/customer.type";
import { Ticket as TicketProps } from "@/utils/ticket.type";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Check, CheckCheck, Text } from "lucide-react";
import { useRouter } from "next/navigation";
import { OpenModal } from "./modal";

type TicketItemProps = {
  ticket: TicketProps;
  customer: Customer | null;
};
export function Ticket({ ticket, customer }: TicketItemProps) {
  const router = useRouter();
  const date = ticket.created_at
    ? format(new Date(ticket.created_at), "yyyy/MM/dd", {
        locale: ptBR,
      })
    : format(new Date(), "yyyy/MM/dd", {
        locale: ptBR,
      });

  async function handleChangeStatus() {
    await changeStatus(ticket.id);
    router.refresh();
  }

  return (
    <>
      <tr className="border-b border-b-neutral-700 h-16 last:border-b-0 hover:bg-neutral-800 transition-all duration-300">
        <td className="text-gray-400 text-left px-2">{customer?.name}</td>
        <td className="text-gray-400 text-left px-2 font-bold">{date}</td>
        <td className="text-white text-left px-2">
          <span
            className={cn(
              ticket.status === "aberto" ? "bg-emerald-500" : "bg-red-500",
              "items-center justify-center px-2 py-1 rounded-md text-xs",
            )}
          >
            {ticket.status.toUpperCase()}
          </span>
        </td>
        <td className="text-gray-400 text-left px-2">
          {ticket.status === "aberto" ? (
            <button onClick={handleChangeStatus} className="mr-2">
              <Check
                className="active:scale-95 duration-300 transition-all ease-linear"
                size={20}
                color="#71717a"
              />
            </button>
          ) : (
            <button className="mr-2">
              <CheckCheck size={20} color="#10b981" />
            </button>
          )}
          <OpenModal customer={customer} ticket={ticket}>
            <Text size={20} color="#6366f1" />
          </OpenModal>
        </td>
      </tr>
    </>
  );
}
