"use client";
import { IUser } from "@/app/models/User";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createUserInput } from "@/constants/inputs";
import { initialRoute } from "@/libs/utils";
import { registerUser } from "@/services/actions/user.actions";
import { Role, TWorkerZod, workerSchema } from "@/services/validators/user.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: string;
  municipality: string;
  CI: string;
  phone: string;
  role: Role;
};

export const FormCreateUser = ({ projectId }: { projectId: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TWorkerZod>({
    resolver: zodResolver(workerSchema),
  });
  const pathname = usePathname();
  const initialPath = initialRoute(pathname);
  const formRef = useRef<HTMLFormElement>(null);
  const { push } = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    toast.loading("Creando usuario...");
    const dataToSend: Partial<IUser> = {
      name: data.name,
      username: data.username,
      email: data.email,
      password: data.password,
      address: data.address,
      project: projectId,
      municipality: data.municipality,
      CI: Number(data.CI),
      phone: data.phone,
      role: data.role,
    };
    const response = await registerUser(dataToSend);

    toast.dismiss();
    if (response.success) {
      toast.success(response.message);
      formRef.current?.reset();
      push(`${initialPath}/admin/users`);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="">
      <h1 className="text-3xl font-bold pb-3">Registrar usuario</h1>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-100">
            Información Personal
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-300">
            Los campos con (*) son obligatorios
          </p>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {createUserInput.map((input) => (
              <div
                key={input.id}
                className={`${input.containerClass} relative`}
              >
                <label htmlFor={input.id} className={input.labelClass}>
                  {input.label}
                </label>
                <div className="mt-2">
                  <Input
                    type={input.type}
                    id={input.id}
                    autoComplete="given-name"
                    className={input.inputClass}
                    {...register(input.name as keyof Inputs)}
                  />
                </div>
                {errors[input.name as keyof Inputs]?.message && (
                  <p className="text-red-500 absolute -bottom-5 text-sm">
                    {errors[input.name as keyof Inputs]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-200">
                Role
              </legend>
              <p className="mt-1 text-sm leading-6 text-gray-300">
                Elige el rol que desees que tenga el usuario
              </p>
              <div className="mt-6 space-y-6 capitalize">
                <div className="flex items-center gap-x-3">
                  <input
                    id="ojeador_item"
                    type="radio"
                    value="user"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    {...register("role")}
                  />
                  <label
                    htmlFor="ojeador_item"
                    className="block text-sm font-medium leading-6 text-gray-300"
                  >
                    Ojeador
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="trabajador_item"
                    type="radio"
                    value="worker"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    {...register("role")}
                  />
                  <label
                    htmlFor="trabajador_item"
                    className="block text-sm font-medium leading-6 text-gray-300"
                  >
                    trabajador
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="administrador_item"
                    type="radio"
                    value="admin"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    {...register("role")}
                  />
                  <label
                    htmlFor="administrador_item"
                    className="block text-sm font-medium leading-6 text-gray-300"
                  >
                    Administrador
                  </label>
                </div>
                {errors.role?.message && (
                  <p className="text-red-500 text-sm">{errors.role?.message}</p>
                )}
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Button type="reset" className="bg-red-500/80 hover:bg-red-500">
          Cancelar
        </Button>
        <Button
          type="submit"
          className="bg-pri-600/80 hover:bg-pri-600"
          disabled={Object.keys(errors).length > 0}
        >
          Registrar
        </Button>
      </div>
    </form>
  );
};
