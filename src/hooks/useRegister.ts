import { register } from "@/services/actions/user.actions";
import { signIn } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";

const INITIAL_REGISTER_FORM = {
  name: "",
  email: "",
  password: "",
};

export const useRegister = () => {
  const [formRegister, setFormRegister] = useState(INITIAL_REGISTER_FORM);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setLoading(true);
    toast.loading("Creando registro...");

    const signupResponse = await register(formRegister);

    if (signupResponse.success) {
      toast.remove();
      toast.success(signupResponse.message);
      await signIn("credentials", {
        email: formRegister.email,
        password: formRegister.password,
        redirect: false,
        callbackUrl: "/",
      });
    } else {
      toast.remove();
      toast.error(signupResponse.message);
    }
    setLoading(false);
  };

  return {
    formRegister,
    loading,
    handleSubmit,
    setFormRegister,
  };
};
