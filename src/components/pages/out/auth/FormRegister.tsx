"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerAdmin } from "@/services/actions/user.actions";
import { adminSchema, TAdminZod } from "@/services/validators/user.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
  username: string;
  email: string;
  password: string;
  role: "admin" | "worker" | "user";
};

export const FormRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAdminZod>({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      role: "admin",
    },
  });
  const { push } = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    toast.loading("Creando usuario...");
    const response = await registerAdmin(data);

    toast.dismiss();

    if (response.success) {
      toast.success(response.message);
      push("/login");
    } else {
      toast.error(response.message);
    }
  };

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-400 space-y-5">
        <div className="text-center">
          <div className="mt-5">
            <div className="w-20 h-20 rounded-full mx-auto bg-gray-400 mb-5"></div>
            <h3 className="text-gray-400 text-2xl font-bold sm:text-3xl">
              Registre una cuenta
            </h3>
            <p className="mt-4 text-gray-400">
              Crea una cuenta para comenzar a usar Copy Manager.
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2 relative">
            <label htmlFor="username" className="font-medium">
              Nombre de usuario
            </label>
            <Input
              id="username"
              type="text"
              required
              className="input"
              {...register("username")}
            />
            <p className="text-xs text-red-500 absolute -bottom-5 left-2">
              {errors.username?.message}
            </p>
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="font-medium">
              Correo
            </label>
            <Input
              id="email"
              type="email"
              required
              className="input"
              {...register("email")}
            />
            <p className="text-xs text-red-500 absolute -bottom-5 left-2">
              {errors.email?.message}
            </p>
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="font-medium">
              Contraseña
            </label>
            <Input
              id="password"
              type="password"
              required
              className="input"
              {...register("password")}
            />
            <p className="text-xs text-red-500 absolute -bottom-5 left-2">
              {errors.password?.message}
            </p>
          </div>
          <Button
            type="submit"
            className="w-full bg-primary/80 hover:bg-primary"
          >
            Crear cuenta
          </Button>
        </form>
        <button className="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg text-sm font-medium hover:bg-gray-50 duration-150 active:bg-gray-100">
          <svg
            className="w-5 h-5"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_17_40)">
              <path
                d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
                fill="#4285F4"
              />
              <path
                d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
                fill="#34A853"
              />
              <path
                d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
                fill="#FBBC04"
              />
              <path
                d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
                fill="#EA4335"
              />
            </g>
            <defs>
              <clipPath id="clip0_17_40">
                <rect width="48" height="48" fill="white" />
              </clipPath>
            </defs>
          </svg>
          Continuar con Google
        </button>
        <p className="flex justify-center gap-1">
          <p>Ya tienes una cuenta?</p>
          <Link
            href="/login"
            className="font-medium text-pri-600 hover:text-pri-500"
          >
            Iniciar sesión
          </Link>
        </p>
      </div>
    </main>
  );
};