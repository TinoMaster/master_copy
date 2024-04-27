import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { RiLogoutCircleLine } from "react-icons/ri";

export const UserOptions = () => {
  const { data: session, status } = useSession();

  if (status === "loading" || status === "unauthenticated") return null;

  return (
    <>
      {session?.user.project ? (
        <Link
          href={`/dashboard/${session.user.project}`}
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
