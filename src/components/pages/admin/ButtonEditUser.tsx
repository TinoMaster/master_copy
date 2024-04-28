"use client";
import { initialRoute } from "@/libs/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const ButtonEditUser = ({ userId }: { userId: string }) => {
  const pathname = usePathname();
  const initialPath = initialRoute(pathname);
  return (
    <Link
      href={`${initialPath}/admin/users/${userId}`}
      className="text-gray-700 text-sm border rounded-lg px-3 py-2 duration-150 bg-white hover:bg-gray-100"
    >
      Editar
    </Link>
  );
};
