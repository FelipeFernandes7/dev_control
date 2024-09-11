"use client";

import { Input } from "@/components/Input";
import { createCustomer } from "@/services/customer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "O campo nome é obrigatório"),
  email: z
    .string()
    .email("Digite um email válido")
    .min(1, "O email é obrigatório"),
  phone: z.string().refine(
    (value) => {
      return /^\(\d{2}\)\d{5}-\d{4}$/.test(value);
    },
    {
      message: "O número de telefone deve conter este formato (xx)xxxxx-xxxx",
    },
  ),
  address: z.string(),
});

type FormValues = z.infer<typeof schema>;
export function CustomerForm() {
  const router = useRouter();

  async function onSubmit(formValues: FormValues) {
    await createCustomer(formValues);

    router.replace("/dashboard/customer");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col mt-6 px-2 gap-4"
    >
      <Input
        label="Nome Completo"
        name="name"
        placeholder="Digite seu nome completo"
        register={register}
        error={errors.name}
      />
      <div className="w-full flex flex-col md:flex-row items-center gap-4">
        <Input
          label="E-mail"
          name="email"
          placeholder="johndoe@gmail.com"
          register={register}
          error={errors.email}
        />
        <Input
          label="Celular"
          name="phone"
          placeholder="(xx) xxxxxx-xxxx"
          register={register}
          error={errors.phone}
        />
      </div>
      <Input
        label="Endereço Completo"
        name="address"
        placeholder="Digite seu endereço completo"
        register={register}
        error={errors?.address}
      />
      <button
        className="bg-indigo-500 my-4 px-2 items-center justify-center text-white h-11 rounded-xl active:scale-95 duration-300 transition-all"
        type="submit"
      >
        Cadastrar
      </button>
    </form>
  );
}
