"use client";
import { LoaderPages } from "@/components/loaders/LoaderPages";
import { FormLogin } from "@/components/pages/out/auth/FormLogin";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { push } = useRouter();
  const { status } = useSession();

  if (status === "loading") {
    return <LoaderPages />;
  }

  if (status === "authenticated") {
    push("/");
  }

  return <FormLogin />;
}
