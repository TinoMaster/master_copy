import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { RiLogoutCircleLine } from "react-icons/ri";

export const UserOptions = ({ business }: { business: string }) => {
  return (
    <>
      {business ? (
        <Link
          href={`/dashboard/${business}`}
          className="flex items-center gap-1 p-2 rounded-lg hover:bg-white/90 hover:text-gray-800 transition-colors duration-150"
        >
          <span className="capitalize text-sm">Proyecto</span>
        </Link>
      ) : (
        <Link
          href="/new-project"
          className="flex items-center gap-1 p-2 rounded-lg hover:bg-white/90 hover:text-gray-800 transition-colors duration-150"
        >
          <Button className="capitalize text-sm bg-primary">
            Crear proyecto
          </Button>
        </Link>
      )}
      <button
        onClick={() => signOut()}
        className="flex items-center gap-1 p-2 rounded-lg hover:bg-white/90 hover:text-gray-800 transition-colors duration-150"
      >
        <RiLogoutCircleLine className="text-lg" />
        <span className="capitalize text-sm">Logout</span>
      </button>
    </>
  );
};
