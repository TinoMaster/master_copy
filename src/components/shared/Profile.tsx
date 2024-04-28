"use client";
import { signOut, useSession } from "next-auth/react";
import { FaUser } from "react-icons/fa";

export const Profile = () => {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div className="w-full h-10 bg-white/5 rounded-full animate-pulse"></div>
    );
  }
  return (
    <button
      onClick={() => {
        window.confirm("¿Desea cerrar sesión?") &&
          signOut({
            redirect: true,
            callbackUrl: "/",
          });
      }}
      className="cursor-pointer flex justify-center items-center relative"
    >
      <div className="flex items-center gap-3">
        <div className="text-darkMode font-serif capitalize w-8 h-8 bg-gray-100 rounded-full flex justify-center items-center">
          <FaUser />
        </div>
        Desconectarse
      </div>
    </button>
  );
};
