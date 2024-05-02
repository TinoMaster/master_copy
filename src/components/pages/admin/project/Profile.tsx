import { IProject } from "@/app/models/Project";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { BsCoin } from "react-icons/bs";

export const ProfileProject = ({ project }: { project: IProject }) => {
  return (
    <form action="">
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
          <div className="flex flex-col sm:flex-row justify-between sm:items-center">
            <label htmlFor="name" className="label">
              Nombre del proyecto
            </label>
            <Input
              type="text"
              id="name"
              className="sm:w-1/2 bg-transparent"
              defaultValue={project.name}
            />
          </div>
        </div>
      </fieldset>
      <div className="flex justify-end">
        <Button className="bg-primary/50">Guardar</Button>
      </div>
    </form>
  );
};
