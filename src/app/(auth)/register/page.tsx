"use client";
import { LoaderPages } from "@/components/loaders/LoaderPages";
import { FormRegister } from "@/components/pages/out/auth/FormRegister";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const { push } = useRouter();
  const { status } = useSession();

  if (status === "loading") {
    return <LoaderPages />;
  }

  if (status === "authenticated") {
    push("/");
  }

  return <FormRegister />;
};

export default RegisterPage;
