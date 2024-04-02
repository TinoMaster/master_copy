"use client";
import { LoadingPageLoader } from "@/components/loaders/pages/LoadingPageLoader";
import { useLogin } from "@/hooks/useLogin";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const { formLogin, setFormLogin, handleSubmit, loading, status } = useLogin();

  if (status === "loading") {
    return <LoadingPageLoader />;
  }

  if (status === "authenticated") {
    router.push("/");
  }

  if (status === "unauthenticated") {
    return (
      <section className="w-full bg-gradient-to-tr from-darkMode via-lightDarkMode to-darkMode min-h-screen flex flex-col justify-center items-center relative">
        {/* <Image
               src={prenotazione}
               alt="fondo auth"
               className="w-full h-full absolute object-cover brightness-25"
            /> */}
        <div className="flex flex-col gap-5 items-center p-2 lg:p-8 sm:max-w-md rounded-lg w-full sm:bg-gradient-to-tr from-darkMode/70 via-primary/10 to-darkMode sm:shadow-lg z-10">
          <h2 className="text-3xl font-bold text-center text-slate-200 py-5">
            Login
          </h2>

          <div className="w-36 h-36 rounded-full bg-white"></div>

          <form
            className="flex flex-col w-full max-w-sm gap-3"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col w-full max-w-sm m-auto">
              <label className="text-slate-200 pl-1" htmlFor="email">
                Correo
              </label>
              <input
                onChange={(e) => {
                  setFormLogin({
                    ...formLogin,
                    email: e.target.value,
                  });
                }}
                value={formLogin.email}
                required
                placeholder="Escriba su correo"
                type="email"
                name="email"
                id="email"
                className="input"
              />
            </div>
            <div className="flex flex-col w-full max-w-sm m-auto">
              <label className="text-slate-200 pl-1" htmlFor="password">
                Contraseña
              </label>
              <input
                onChange={(e) => {
                  setFormLogin({
                    ...formLogin,
                    password: e.target.value,
                  });
                }}
                value={formLogin.password}
                required
                placeholder="Escriba una contraseña"
                type="password"
                name="password"
                id="password"
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
                  <div className="animate-spin rounded-full w-full h-full border-t-2 border-primary border-t-primary border-r-2 border-r-primary" />
                )}
              </div>
              <span className="mr-[25px]">Entrar</span>
            </button>
          </form>
          {/* <div className="pt-5 flex text-gray-100 gap-1">
            <span>No tienes cuenta?</span>
            <Link
              href={"/register"}
              className="text-blue-300 border-b border-blue-200"
            >
              Registrarse
            </Link>
          </div>
          <p className="text-gray-100 mt-5">o bien</p> */}
        </div>
      </section>
    );
  }
}
