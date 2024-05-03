"use client";
import { IProject } from "@/app/models/Project";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateProject } from "@/services/actions/project.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BsCoin } from "react-icons/bs";
import { z } from "zod";

type Inputs = {
  name: string;
};
const editProjectSchema = z.object({
  name: z
    .string()
    .min(3, { message: "El nombre debe ser mayor a 3 caracteres" }),
});
type TEditProject = z.infer<typeof editProjectSchema>;

export const ProfileProject = ({ project }: { project: IProject }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
  } = useForm<TEditProject>({
    resolver: zodResolver(editProjectSchema),
    defaultValues: {
      name: project.name,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    toast.loading("Actualizando proyecto...");
    const response = await updateProject(project._id, data);

    toast.dismiss();

    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="">
        <legend className="mini-title">Resumen</legend>
        <div>
          <p className="mini-subtitle">Configura tu perfil.</p>
        </div>
        <div className="px-2 py-8 space-y-4">
          <div className="flex justify-between items-center">
            <label htmlFor="credit" className="label">
              Credito
            </label>
            <div className="flex gap-2 items-center text-gray-300 rounded-md">
              <p className="font-bold">{project.credit}</p>
              <BsCoin className="text-2xl text-yellow-400" />
              <Button className="px-3 py-2.5 rounded-l-md bg-gray-600/80">
                Comprar
              </Button>
            </div>
          </div>
          <div className="flex flex-col relative sm:flex-row justify-between sm:items-center">
            <label htmlFor="name" className="label">
              Nombre del proyecto
            </label>
            <Input
              type="text"
              id="name"
              className="sm:w-1/2 bg-transparent"
              {...register("name", { required: true })}
            />
            <p className="text-red-500 text-xs absolute -bottom-5 left-2">
              {errors.name?.message}
            </p>
          </div>
        </div>
      </fieldset>
      <div className="flex justify-end">
        <Button
          className="bg-primary/50 disabled:bg-primary/5"
          type="submit"
          disabled={Object.keys(errors).length > 0 || !isDirty}
        >
          Guardar
        </Button>
      </div>
    </form>
  );
};
