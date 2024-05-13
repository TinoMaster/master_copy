"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createBusinessInput } from "@/constants/inputs";
import { cutPathnameByPieces } from "@/libs/utils";
import { createBusiness } from "@/services/actions/business.actions";
import {
  businessSchema,
  TBusinessZod,
} from "@/services/validators/business.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
  name: string;
  description: string;
  address: string;
  municipality: string;
  phone?: string;
};

export function FormCreateBusiness({ session }: { readonly session: Session }) {
  const pathname = usePathname();
  const basePath = cutPathnameByPieces(pathname, 1, 3);
  const { push } = useRouter();
  console.log(basePath);
  const { user } = session;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TBusinessZod>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      owner: user.sub,
      project: user.project,
      status: "active",
      statisticPermission: false,
    },
  });
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    toast.loading("Creando negocio...");
    const response = await createBusiness(data);
    toast.dismiss();
    if (response.success) {
      toast.success(response.message);
      formRef.current?.reset();
      push(`${basePath}/admin/business`);
    } else {
      toast.error(response.message);
    }
  };
  console.log(errors);

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="container">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <h2 className="title">Registrar Negocio</h2>
              <h3 className="mini-title">Información del Negocio</h3>
              <p className="subtitle">
                Un negocio seria un local o punto de venta que pertenece a tu
                proyecto, puede crear tantos como necesite solo que puede tener
                cargos adicionales.{" "}
                <Link href={"#"} className="text-blue-500">
                  Leer mas aquí
                </Link>
              </p>
            </div>
            {createBusinessInput.map((input) => (
              <div
                key={input.id}
                className={`${input.containerClass} relative`}
              >
                <label htmlFor={input.id} className={input.labelClass}>
                  {input.label}
                  {input.required && <span className="text-red-500">*</span>}
                </label>
                {input?.description && (
                  <p className="mini-subtitle pl-1">{input.description}</p>
                )}
                <div className="mt-2">
                  <Input
                    type={input.type}
                    id={input.id}
                    autoComplete="given-name"
                    className={`${
                      errors[input.name as keyof Inputs]?.message &&
                      "border-red-500 outline-red-500 text-red-500"
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

        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="mini-title">Datos a compartir</legend>
              <p className="subtitle">
                Elige si deseas compartir tu negocio con otras personas, esto
                ayudara a que usuarios puedan conocerlo
              </p>
              <div className="mt-6 space-y-6">
                {/* Checkbox accept share */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="statisticPermission"
                    onCheckedChange={(val: CheckedState) => {
                      return typeof val === "boolean"
                        ? setValue("statisticPermission", val, {
                            shouldDirty: true,
                          })
                        : setValue("statisticPermission", false);
                    }}
                  />
                  <label
                    htmlFor="statisticPermission"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Aceptar compartir
                  </label>
                </div>
                <div className={`sm:col-span-3 relative`}>
                  <label htmlFor="description" className="label">
                    <span>Descripción</span>
                  </label>
                  <p className="subtitle">
                    Elige una descripción para tu proyecto, esta sirve para que
                    en caso de que compartas tu negocio con otras personas
                    puedas identificarlo
                  </p>
                  <div className="mt-2">
                    <Textarea
                      placeholder="Agrega una descripción"
                      id="description"
                      className=""
                      {...register("description")}
                    />
                  </div>
                  {errors["description"]?.message && (
                    <p className="text-red-500 absolute -bottom-5 text-sm">
                      {errors["description"]?.message}
                    </p>
                  )}
                </div>
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
}
