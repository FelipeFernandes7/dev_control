import { Input } from "@/components/Input";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "O nome do chamado é obrigatório"),
  description: z.string().min(1, "Descreva um pouco mais sobre o problema"),
});
type FormValues = z.infer<typeof schema>;

export function FormTicket() {
  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  return (
    <form className="w-full flex flex-col md:max-w-2xl mx-auto gap-4">
      <Input
        label="nome do chamado"
        name="name"
        type="text"
        register={register}
        error={errors.name}
        placeholder="Digite um nome para o chamado..."
      />
      <div className="w-full flex flex-col">
        <label className="font-medium text-white text-sm">
          Descreva o problema
        </label>
        <textarea
          id="description"
          className="outline-none w-full border border-neutral-800 rounded-xl px-2 pt-2 mb-2 h-24 resize-none bg-transparent"
          placeholder="Nos informe qual o seu problema aqui :)"
          {...register("description")}
          required
        ></textarea>
        {!!errors.description && (
          <p className="text-red-500 mt-2 font-medium text-xs">
            {errors.description.message}
          </p>
        )}
      </div>
      <button
        className="bg-indigo-500 my-4 px-2 items-center justify-center text-white h-11 rounded-xl active:scale-95 duration-300 transition-all"
        type="submit"
      >
        Cadastrar
      </button>
    </form>
  );
}
