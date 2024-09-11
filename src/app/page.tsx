import Image from "next/image";
import attendant from "@/assets/undraw/attendant.svg";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
      <h2 className="text-2xl font-medium mb-2">Gerencie sua empresa</h2>
      <h1 className="font-bold text-3xl mb-8 text-indigo-500 md:text-4xl">
        Atendimento, clientes
      </h1>
      <Image
        className="max-w-sm md:max-w-xl"
        src={attendant}
        alt="Imagem de um cliente"
        width={300}
      />
    </main>
  );
}
