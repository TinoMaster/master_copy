"use client";
import { IBusiness } from "@/app/models/Business";
import { IUser } from "@/app/models/User";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  chooseSalaryType,
  chooseUserRole,
  createUserInput,
} from "@/constants/inputs";
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
  business?: string[];
  salaryType: { percentage: string; fixed: string };
};

export const FormCreateUser = ({
  projectId,
  business,
}: {
  projectId: string;
  business: IBusiness[];
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<TWorkerZod>({
    resolver: zodResolver(workerSchema),
    defaultValues: {
      business: business.map((b) => b._id),
      salaryType: { percentage: "0", fixed: "0" },
    },
  });
  const pathname = usePathname();
  const initialPath = initialRoute(pathname);
  const formRef = useRef<HTMLFormElement>(null);
  const { push } = useRouter();

  console.log(errors);

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
      business: data.business,
      salaryType: {
        percentage: Number(data.salaryType.percentage),
        fixed: Number(data.salaryType.fixed),
      },
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
        {/* User information */}
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="subtitle">
            Información Personal del Usuario que formara parte de su equipo
          </h2>
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
                    autoComplete="off"
                    className={` ${
                      errors[input.name as keyof Inputs]
                        ? "border-red-500 outline-red-500 text-red-500"
                        : ""
                    }`}
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
        {/* User Role */}
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="mini-title">Role</legend>
              <p className="subtitle">
                Elige el rol que desees que tenga el usuario
              </p>
              <div className="mt-6 space-y-6 capitalize">
                {chooseUserRole.map((item) => (
                  <div key={item.id} className="flex items-center gap-x-3">
                    <Input
                      id={item.id}
                      type={item.type}
                      value={item.value}
                      className={item.inputClass}
                      {...register(item.name as keyof Inputs)}
                    />
                    <label htmlFor={item.id} className={item.labelClass}>
                      {item.label}
                    </label>
                  </div>
                ))}
                {errors.role?.message && (
                  <p className="text-red-500 text-sm">{errors.role?.message}</p>
                )}
              </div>
            </fieldset>
          </div>
        </div>
        {/* User Salary Type */}
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="mini-title">Salario</legend>
              <p className="subtitle">
                Elige el tipo de salario que desees que tenga el usuario, esto
                se aplicara a la hora del cuadre diario
              </p>
              <div className="mt-6 space-y-6 capitalize">
                {chooseSalaryType.map((input) => (
                  <div
                    key={input.id}
                    className={`${input.containerClass} relative`}
                  >
                    <label htmlFor={input.id} className="label">
                      {input.label}
                      {input.required && (
                        <span className="text-red-500">*</span>
                      )}
                    </label>
                    {input?.description && (
                      <p className="mini-subtitle pl-1">{input.description}</p>
                    )}
                    <div className="mt-2 flex max-w-[200px]">
                      <Input
                        type={input.type}
                        id={input.id}
                        autoComplete="given-name"
                        className={`${
                          errors.salaryType?.[
                            input.name as keyof Inputs["salaryType"]
                          ] && "border-red-500 outline-red-500 text-red-500"
                        }`}
                        {...register(
                          `salaryType.${input.name}` as keyof Inputs
                        )}
                      />
                      <span className="p-2">{input.unit}</span>
                    </div>
                    {errors.salaryType && (
                      <p className="text-red-500 absolute -bottom-5 text-sm">
                        {
                          errors.salaryType[
                            input.name as keyof Inputs["salaryType"]
                          ]?.message
                        }
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
        </div>
        {/* User Business */}
        {business.length > 1 && (
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="mini-title">Negocios</legend>
                <p className="subtitle">
                  Elige los negocios que desees que el usuario tenga acceso
                </p>
                <div className="mt-6 space-y-6 capitalize">
                  {business.map((item) => (
                    <div key={item._id} className="flex items-center space-x-2">
                      <Checkbox
                        id={item._id}
                        value={item._id}
                        defaultChecked={getValues("business").includes(
                          item._id
                        )}
                        onCheckedChange={(val) => {
                          return val
                            ? setValue(
                                "business",
                                [...getValues("business"), item._id],
                                { shouldDirty: true }
                              )
                            : setValue(
                                "business",
                                getValues("business").filter(
                                  (id) => id !== item._id
                                ),
                                { shouldDirty: true }
                              );
                        }}
                      />
                      <label
                        htmlFor={item._id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {item.name}
                      </label>
                    </div>
                  ))}
                  {errors.business?.message && (
                    <p className="text-red-500 text-sm">
                      {errors.business?.message}
                    </p>
                  )}
                </div>
              </fieldset>
            </div>
          </div>
        )}
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
