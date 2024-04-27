import { userHasProject } from "@/services/actions/user.actions";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";

interface IFormLogin {
  email: string;
  password: string;
}

const INITIAL_FORM: IFormLogin = {
  email: "",
  password: "",
};

export const useLogin = () => {
  const { status } = useSession();
  const [formLogin, setFormLogin] = useState<IFormLogin>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.loading("Iniciando sesión...");
    setLoading(true);
    const res = await signIn("credentials", {
      email: formLogin.email,
      password: formLogin.password,
      redirect: false,
    });
    toast.remove();

    if (res?.ok) {
      toast.success("Sesión iniciada con éxito");
      const response = await userHasProject(formLogin.email);
      setFormLogin(INITIAL_FORM);

      if (!response.success) {
        window.location.href = "/";
      } else {
        window.location.href = `/dashboard/${response.data}`;
      }
    } else {
      toast.error("Usuario o contraseña incorrectos");
    }
    setLoading(false);
  };

  return {
    formLogin,
    loading,
    handleSubmit,
    setFormLogin,
    status,
  };
};
