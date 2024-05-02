import { Input } from "@/components/ui/input";
import { editBusinessInput } from "@/constants/inputs";
import { TBusinessUpdateZod } from "@/services/validators/business.zod";
import { UseFormRegister } from "react-hook-form";

export const ProfileBusiness = ({
  register,
}: {
  register: UseFormRegister<TBusinessUpdateZod>;
}) => {
  return (
    <div className="space-y-10">
      <div>
        <h3 className="mini-title">Perfil</h3>
        <p className="mini-subtitle">Configura el perfil de tu negocio.</p>
      </div>
      <div className="px-2 space-y-4">
        {editBusinessInput.map((input) => (
          <div key={input.id} className="flex flex-col sm:flex-row justify-between sm:items-center">
            <label htmlFor={input.id} className={input.labelClass}>
              {input.label}
            </label>
            <Input
              type="text"
              placeholder={input.placeholder}
              id={input.id}
              className="sm:w-1/2 bg-transparent"
              {...register(input.name as keyof TBusinessUpdateZod)}
            />
          </div>
        ))}
        <div className="flex flex-col sm:flex-row justify-between">
          <label htmlFor="description" className="label">
            Descripción
          </label>
          <textarea
            placeholder="Esto es una descripción"
            id="description"
            className="flex h-20 sm:w-1/2 bg-transparent rounded-md border border-slate-200 resize-none overflow-auto px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
            {...register("description")}
          />
        </div>
      </div>
    </div>
  );
};
