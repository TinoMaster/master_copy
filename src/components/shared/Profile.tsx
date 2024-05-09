"use client";
import { signOut, useSession } from "next-auth/react";
import { FaUser } from "react-icons/fa";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export const Profile = () => {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div className="w-full flex gap-2 justify-center items-center h-16 animate-pulse">
        <div className="w-10 h-10 bg-black/10 rounded-full" />
        <div className="w-1/2 h-6 bg-black/10 rounded-md" />
      </div>
    );
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="flex h-14 gap-2 items-center hover:bg-primary/10 text-gray-700 relative bg-gray-50">
          <FaUser />
          Desconectarse
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-11/12 max-w-md m-auto flex flex-col justify-center items-center rounded-md">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Estas seguro que quieres cerrar tu sesión?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Cualquier información no guardada se perderá.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() =>
              signOut({
                redirect: true,
                callbackUrl: "/",
              })
            }
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
