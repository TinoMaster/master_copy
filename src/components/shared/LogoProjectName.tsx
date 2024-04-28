"use client";

import { useSession } from "next-auth/react";

export const LogoProjectName = ({ name }: { name: string }) => {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div className="w-full h-5 overflow-hidden rounded-full shadow bg-white/20 p-1  animate-pulse"></div>
    );
  }

  return (
    <div className="flex ml-1 items-center gap-1 text-sm">
      <span className="font-bold text-white">Proyecto:</span>
      <span className="font-bold text-white">{name}</span>
    </div>
  );
};
