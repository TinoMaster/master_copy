import Link from "next/link";

const DeniedPage = () => {
  return (
    <section className="w-full bg-gradient-to-tr from-darkMode via-lightDarkMode to-darkMode min-h-screen flex flex-col justify-center items-center relative">
      <h2 className="text-3xl font-bold text-center text-slate-200 py-5">
        Permiso denegado
      </h2>

      <p className="text-center text-slate-200">
        No tienes permiso para acceder a esta página
      </p>

      <Link
        href="/"
        className="text-center text-slate-200 underline hover:text-slate-400"
      >
        Ir a la página principal
      </Link>
    </section>
  );
};

export default DeniedPage;
