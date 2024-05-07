"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FaUserAlt } from "react-icons/fa";
import { User } from "./User";

export const OutProfile = () => {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div className="w-10 h-10 bg-black/5 rounded-full animate-pulse"></div>
    );
  }

  if (status === "authenticated") {
    return <User />;
  }

  return (
    <Link href="/login">
      <Button className="w-10 h-10 p-1 rounded-full flex justify-center items-center lg:hidden bg-white/5">
        <FaUserAlt className="w-5 h-5" />
      </Button>
      <Button className="hidden lg:flex bg-gradient-to-r from-primary via-pri-600 to-primary">
        Iniciar Session
      </Button>
    </Link>
  );
};
