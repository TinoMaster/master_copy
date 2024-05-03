"use client";
import { IUser } from "@/app/models/User";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ownerInput } from "@/constants/inputs";
import { updateUser } from "@/services/actions/user.actions";
import { editAdminSchema, TEditAdminZod } from "@/services/validators/user.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
  username: string;
  email: string;
  phone?: string;
};

export const Owner = ({ user }: { user: IUser }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
  } = useForm<TEditAdminZod>({
    resolver: zodResolver(editAdminSchema),
    defaultValues: {
      username: user.username,
      email: user.email,
      phone: user.phone ?? "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    toast.loading("Actualizando usuario...");
    const response = await updateUser(user._id, data);
    toast.dismiss();

    if (response.success) {
      toast.success("Usuario actualizado correctamente");
    } else {
      toast.error(response.message);
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="">
        <legend className="mini-title">Propietario</legend>
        <div>
          <p className="mini-subtitle">Configura tu perfil.</p>
        </div>
        <div className="px-2 py-8 space-y-4">
          {ownerInput.map((input) => (
            <div
              key={input.id}
              className="flex flex-col sm:flex-row relative justify-between sm:items-center"
            >
              <label htmlFor={input.id} className={input.labelClass}>
                {input.label}
              </label>
              <Input
                type="text"
                placeholder={input.placeholder}
                id={input.id}
                className="sm:w-1/2 bg-transparent"
                {...register(input.name as keyof Inputs)}
              />
              <p className="text-red-500 text-xs absolute -bottom-5 left-2">
                {errors[input.name as keyof Inputs]?.message}
              </p>
            </div>
          ))}
        </div>
      </fieldset>
      <div className="flex justify-end">
        <Button
          type="submit"
          className="bg-primary/50 disabled:bg-primary/5"
          disabled={Object.keys(errors).length > 0 || !isDirty}
        >
          Guardar
        </Button>
      </div>
    </form>
  );
};
