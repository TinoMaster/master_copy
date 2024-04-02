"use client";
import { useRegister } from "@/hooks/useRegister";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Register() {
  const { status } = useSession();
  const { formRegister, loading, handleSubmit, setFormRegister } =
    useRegister();

  if (status === "loading") {
    return <p className="text-slate-200">loading...</p>;
  }

  if (status === "authenticated") {
    redirect("/");
  }

  if (status === "unauthenticated") {
    return (
      <section className="w-full bg-gradient-to-tr from-darkMode via-lightDarkMode to-darkMode min-h-screen flex flex-col justify-center items-center relative">
        <div className="flex flex-col items-center p-2 lg:p-8 max-w-md rounded-lg w-full sm:bg-gradient-to-tr from-darkMode/70 via-primary/10 to-darkMode shadow-lg z-10">
          <h2 className="text-3xl font-bold text-center text-slate-200 py-5">
            Registrarse
          </h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full max-w-sm gap-3 z-10"
          >
            <div className="flex flex-col w-full max-w-sm m-auto">
              <label className="text-slate-200" htmlFor="name">
                Nombre
              </label>
              <input
                onChange={(ev) =>
                  setFormRegister({
                    ...formRegister,
                    [ev.target.name]: ev.target.value,
                  })
                }
                required
                placeholder="Escriba su nombre"
                type="text"
                name="name"
                value={formRegister.name}
                id="name"
                className="input"
              />
            </div>
            <div className="flex flex-col w-full max-w-sm m-auto">
              <label className="text-slate-200" htmlFor="email">
                Correo
              </label>
              <input
                onChange={(ev) =>
                  setFormRegister({
                    ...formRegister,
                    [ev.target.name]: ev.target.value,
                  })
                }
                required
                placeholder="Escriba su correo"
                type="email"
                name="email"
                value={formRegister.email}
                id="email"
                className="input"
              />
            </div>
            <div className="flex flex-col w-full max-w-sm m-auto">
              <label className="text-slate-200" htmlFor="password">
                Contraseña
              </label>
              <input
                onChange={(ev) =>
                  setFormRegister({
                    ...formRegister,
                    [ev.target.name]: ev.target.value,
                  })
                }
                required
                placeholder="Escriba una contraseña"
                type="password"
                name="password"
                id="password"
                value={formRegister.password}
                className="input"
              />
            </div>
            <button
              disabled={loading}
              type="submit"
              className="bg-pri-600 gap-2 flex relative justify-center items-center shadow-md p-2 rounded-md mt-2 text-white w-full max-w-sm m-auto"
            >
              <div className={`w-8 h-8 ${loading && "cursor-wait"}`}>
                {loading && (
                  <div className="animate-spin rounded-full w-full h-full border-t-2 border-primary border-t-primary border-r-2 border-r-primary"></div>
                )}
              </div>
              <span className="mr-[25px]">Registrarse</span>
            </button>
          </form>
          {/* <div className="pt-5 flex text-gray-100 gap-1">
            <span>Ya existe la cuenta? visite → </span>
            <Link
              href={"/login"}
              className="text-blue-300 border-b border-blue-200"
            >
              iniciar session
            </Link>
          </div>
          <p className="text-gray-100 mt-5">o bien</p> */}
        </div>
      </section>
    );
  }
}
