"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createBusinessInput } from "@/constants/inputs";
import { createProject } from "@/services/actions/project.actions";
import { projectSchema, TProjectZod } from "@/services/validators/project.zod";
import { CreateFirstProject } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
  projectName: string;
  name: string;
  description: string;
  address: string;
  municipality: string;
  statisticPermission: boolean;
  phone?: string;
  status: string;
};

export const FormCreateProject = ({ userId }: { userId: string }) => {
  const { data: session, update } = useSession();
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TProjectZod>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      status: "active",
      statisticPermission: false,
    },
  });
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    toast.loading("Creando proyecto...");
    const dataToSend: CreateFirstProject = {
      name: data.name,
      projectName: data.projectName,
      description: data.description,
      address: data.address,
      municipality: data.municipality,
      phone: data.phone,
      owner: userId,
      status: "active",
      statisticPermission: data.statisticPermission,
    };
    const response = await createProject(dataToSend);
    toast.dismiss();
    if (!response.success) {
      toast.error(response.message);
    } else {
      toast.success(response.message);
      formRef.current?.reset();

      await update({
        ...session,
        user: { ...session?.user, project: response.projectId },
      });
      push(`/dashboard/${response.projectId}`);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="">
      <h2 className="title">Registrar Proyecto</h2>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h3 className="mini-title">Información del proyecto</h3>
          <p className="subtitle">
            Un proyecto es una organización que se encarga de gestionar uno o
            mas negocios de copias. Solo puedes registrar un proyecto una vez
            por cada usuario.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className={`sm:col-span-3 relative`}>
              <label htmlFor="project-name" className="label">
                <span>Nombre del proyecto</span>
                <span className="text-red-500">*</span>
              </label>
              <p className="mini-subtitle pl-1">
                El nombre del proyecto será el nombre que defina toda la
                organización
              </p>
              <div className="mt-2">
                <Input
                  type="text"
                  id="project-name"
                  className=""
                  {...register("projectName")}
                />
              </div>
              {errors["projectName"]?.message && (
                <p className="text-red-500 absolute -bottom-5 text-sm">
                  {errors["projectName"]?.message}
                </p>
              )}
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <h2 className="title">Registrar Negocio</h2>
              <h3 className="mini-title">Información del Negocio</h3>
              <p className="subtitle">
                Un negocio seria un local de los tantos que puede tener, luego
                tendrá la posibilidad de agregar otros en caso de tener mas de
                uno
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
                    className="labelCheckbox"
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
                  <p className="mini-subtitle pl-1">
                    Elige una descripción para tu proyecto, esta sirve para que
                    en caso de que compartas tu negocio con otras personas
                    puedas identificarlo
                  </p>
                  <div className="mt-2">
                    <Textarea
                      id="description"
                      className={`${
                        errors["description"]?.message &&
                        "border-red-500 outline-red-500 text-red-500"
                      }`}
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
};
