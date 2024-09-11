export function Card() {
  return (
    <article className="w-full md:max-w-[400px] flex flex-col bg-neutral-900 border border-neutral-800 rounded-2xl p-4 gap-2 hover:scale-105 duration-300 transition-all">
      <p className="text-sm">
        <strong>Nome:</strong> ratazana
      </p>
      <p className="text-sm">
        <strong>Email:</strong> example@gmail.com
      </p>
      <p className="text-sm">
        <strong>Telefone:</strong> (16)993044-9090
      </p>
      <button className="text-white h-8 px-4 mt-2 text-xs font-bold rounded-xl bg-indigo-500 self-start">
        Excluir
      </button>
    </article>
  );
}
