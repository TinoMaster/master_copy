"use client";
import { IProject } from "@/app/models/Project";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useNav from "@/context/navContext";
import { updateProject } from "@/services/actions/project.actions";
import {
  editProjectSchema,
  TEditProjectZod,
} from "@/services/validators/project.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BsCoin } from "react-icons/bs";

type Inputs = {
  name: string;
};

export const ProfileProject = ({ project }: { project: IProject }) => {
  const { updateProjectNameState } = useNav();
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
  } = useForm<TEditProjectZod>({
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
      updateProjectNameState();
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
            <div className="sm:w-1/2 relative">
              <Input
                type="text"
                id="name"
                className="bg-transparent"
                {...register("name", { required: true })}
              />
              <p className="text-red-500 text-xs absolute -bottom-5 left-2">
                {errors.name?.message}
              </p>
            </div>
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
