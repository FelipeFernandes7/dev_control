import { Input } from "@/components/Input";
import Link from "next/link";

export default function NewTicket() {
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
      <form className="w-full flex flex-col mt-6 px-2 gap-4">
        <Input label="Nome do chamado" placeholder="teste" />
        <div className="w-full flex flex-col">
          <label className="font-medium text-white text-sm">
            Descreva o problema
          </label>
          <textarea
            className="outline-none w-full border border-neutral-800 rounded-xl px-2 pt-2 mb-2 h-24 resize-none bg-transparent"
            placeholder="Nos informe qual o seu problema aqui :)"
            required
          ></textarea>
        </div>
        <div className="w-full flex flex-col">
          <label className="font-medium text-white text-sm">
            Selecione o cliente
          </label>
          <select className="border border-neutral-800 rounded-xl px-2 w-full h-14 md:h-11 outline-none bg-transparent text-white">
            <option value="cliente1">Cliente1</option>
          </select>
        </div>
      </form>
    </main>
  );
}
