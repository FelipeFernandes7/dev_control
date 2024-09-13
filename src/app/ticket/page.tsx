"use client";
import { z } from "zod";
import { Input } from "@/components/Input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormTicket } from "./components/form";
import { searchCustomer } from "@/services/customer";

const schema = z.object({
  email: z
    .string()
    .email("Digite o email de um cliente válido")
    .min(1, "o Email obrigatório"),
});
type FormValues = z.infer<typeof schema>;

export type CustomerData = {
  id: string;
  name: string;
};

export default function TicketPage() {
  const [customer, setCustomer] = useState<CustomerData | null>(null);

  const {
    handleSubmit,
    setValue,
    setError,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(formValues: FormValues) {
    const response = await searchCustomer(formValues.email);

    if (response.data === null) {
      setError("email", { type: "custom", message: "Cliente não encontrado" });
      return;
    }

    setCustomer({
      id: response.data.id,
      name: response.data.name,
    });
  }

  function clearCustomer() {
    setCustomer(null);
    setValue("email", "");
  }

  return (
    <div className="w-full px-4">
      <h1 className="font-bold text-3xl text-center mt-24">Abrir chamado</h1>
      <main className="w-full flex flex-col mt-4 mb-2">
        {customer ? (
          <div className="w-full flex items-center justify-between bg-neutral-800 p-3 rounded-xl mt-4 mb-5 max-w-2xl mx-auto">
            <strong className="flex items-center gap-2">
              <p className="font-medium">Cliente selecionado:</p>
              {customer.name}
            </strong>
            <button onClick={clearCustomer}>
              <X
                className="text-red-500 hover:text-pink-400 transition-all duration-300"
                size={20}
              />
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full md:max-w-2xl mx-auto"
          >
            <div className="w-full">
              <Input
                name="email"
                type="email"
                placeholder="example@gmail.com"
                register={register}
                error={errors.email}
              />
            </div>
            <Button className="w-full h-10 transition-all duration-300 rounded-xl ease-linear hover:bg-indigo-600 bg-indigo-500 flex items-center my-5 justify-center gap-2">
              Procurar Cliente <Search size={20} />
            </Button>
          </form>
        )}
        {customer !== null && <FormTicket customer={customer} />}
      </main>
    </div>
  );
}
