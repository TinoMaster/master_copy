"use client";
import { initialRoute } from "@/libs/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaPlus } from "react-icons/fa";

export const ButtonAddUser = () => {
  const pathname = usePathname();
  const initialPath = initialRoute(pathname);
  return (
    <Link
      href={`${initialPath}/admin/users/register`}
      className="inline-flex items-center justify-center gap-2 p-3 mt-2 font-medium text-sm text-center text-white bg-pri-600 hover:bg-pri-500 active:bg-pri-700 rounded-lg sm:mt-0"
    >
      <FaPlus />
      Crear usuario
    </Link>
  );
};
