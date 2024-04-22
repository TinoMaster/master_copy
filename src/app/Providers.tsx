"use client";
import { NavProvider } from "@/context/navContext";
import { SessionProvider } from "next-auth/react";

export function Providers({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <NavProvider>{children}</NavProvider>
    </SessionProvider>
  );
}
