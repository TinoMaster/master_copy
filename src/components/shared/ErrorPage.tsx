"use client";
import { useRouter } from "next/navigation";

export const ErrorPage = () => {
  const router = useRouter();

  const refreshPage = () => {
    router.refresh();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-bold mb-4">¡Oops! Algo salió mal.</h1>
      <p className="text-lg mb-8">
        Estamos teniendo problemas para cargar esta página.
      </p>
      <button
        onClick={refreshPage}
        className="bg-primary hover:bg-pri-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Refrescar
      </button>
    </div>
  );
};
