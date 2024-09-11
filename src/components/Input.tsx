import { HTMLProps } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface Input extends HTMLProps<HTMLInputElement> {
  label?: string;
  error?: FieldError | undefined;
  name?: string;
  register?: UseFormRegister<any>;
}

export function Input({
  label,
  error,
  name,

  register,
  ...rest
}: Input) {
  return (
    <div className="w-full flex flex-col">
      {!!label && (
        <label className="font-medium text-white text-sm" htmlFor={name}>
          {label}
        </label>
      )}
      <section
        className={`w-full h-14 md:h-11 mt-1 ${
          error ? "border-2 border-red-500" : "border border-neutral-800"
        } flex rounded-xl items-center px-4 bg-transparent justify-between`}
      >
        {register && name ? (
          <input
            className="w-full h-14 md:h-11 outline-none bg-transparent text-white"
            {...register(name)}
            {...(label ? { id: name } : {})}
            {...rest}
          />
        ) : (
          <input
            className="w-full h-14 md:h-11 outline-none bg-transparent text-white"
            {...(label ? { id: name } : {})}
            {...rest}
          />
        )}
      </section>
      {!!error && (
        <p className="text-red-500 mt-2 font-medium text-xs">{error.message}</p>
      )}
    </div>
  );
}
