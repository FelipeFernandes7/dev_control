type Customer = {
  name: string;
  email: string;
  phone: string;
};

export function Card({ name, email, phone }: Customer) {
  return (
    <article className="w-full md:max-w-[400px] flex flex-col bg-neutral-900 border border-neutral-800 rounded-2xl p-4 gap-2 hover:scale-105 duration-300 transition-all">
      <p className="text-sm">
        <strong>Nome:</strong> {name}
      </p>
      <p className="text-sm">
        <strong>Email:</strong> {email}
      </p>
      <p className="text-sm">
        <strong>Telefone:</strong> {phone}
      </p>
      <button className="text-white h-8 px-4 mt-2 text-xs font-bold rounded-xl bg-indigo-500 self-start">
        Excluir
      </button>
    </article>
  );
}
