import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { Customer } from "@/utils/customer.type";
import { Ticket } from "@/utils/ticket.type";
import { ReactNode } from "react";

type OpenModalProps = {
  children: ReactNode;
  customer: Customer | null;
  ticket: Ticket | null;
};

export function OpenModal({ customer, ticket, children }: OpenModalProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent className="bg-neutral-950 border border-neutral-700 ">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-medium">
            Detalhes do chamado
          </AlertDialogTitle>

          <div className="w-full flex items-center gap-1">
            <AlertDialogDescription className="text-sm font-medium text-neutral-200">
              Título:
            </AlertDialogDescription>
            <AlertDialogDescription className="text-sm font-medium text-neutral-400">
              {ticket?.name}
            </AlertDialogDescription>
          </div>
          <AlertDialogDescription>
            <AlertDialogDescription className="text-sm font-medium text-neutral-200">
              Descrição:
            </AlertDialogDescription>
            {ticket?.description}
          </AlertDialogDescription>
          <Separator orientation="horizontal" />
          <AlertDialogTitle className="font-medium">
            Detalhes do cliente
          </AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col">
            <p className="text-neutral-200 text-sm">
              Nome:
              <span className="font-medium text-neutral-500 ml-2">
                {customer?.name}
              </span>
            </p>
            <p className="text-neutral-200 text-sm">
              Email:
              <span className="font-medium text-neutral-500 ml-2">
                {customer?.email}
              </span>
            </p>
            <p className="text-neutral-200 text-sm">
              Telefone:
              <span className="font-medium text-neutral-500 ml-2">
                {customer?.phone}
              </span>
            </p>
            <p className="text-neutral-200 text-sm">
              Endereço:
              <span className="font-medium text-neutral-500 ml-2">
                {customer?.address}
              </span>
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction className="bg-neutral-800 rounded-xl">
            Fechar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
