import { z } from "zod";

const roles = ["admin", "user", "worker"] as const;

export const userSchema = z
  .object({
    name: z
      .string()
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .max(50, "El nombre no puede tener mas de 50 caracteres"),
    email: z.string().min(1, "El correo es requerido").email("Correo inválido"),
    username: z
      .string()
      .min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    address: z
      .string()
      .min(10, "La dirección debe tener al menos 10 caracteres"),
    municipality: z.string().min(3, "La localidad es requerida"),
    CI: z.string().refine(
      (value) => {
        const regex = /^\d{11}$/;
        return regex.test(value);
      },
      { message: "CI invalido" }
    ),
    phone: z.string().refine(
      (value) => {
        const regex = /^\d{8}$/;
        return regex.test(value);
      },
      { message: "Celular invalido" }
    ),
    role: z.enum(roles, {
      errorMap: () => ({ message: "Debe seleccionar un rol" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export const userToEditSchema = z.object({
  name: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(50, "El nombre no puede tener mas de 50 caracteres"),
  email: z.string().min(1, "El correo es requerido").email("Correo inválido"),
  username: z
    .string()
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
  address: z.string().min(10, "La dirección debe tener al menos 10 caracteres"),
  municipality: z.string().min(3, "La localidad es requerida"),
  CI: z.string().refine(
    (value) => {
      const regex = /^\d{11}$/;
      return regex.test(value);
    },
    { message: "CI invalido" }
  ),
  phone: z.string().refine(
    (value) => {
      const regex = /^\d{8}$/;
      return regex.test(value);
    },
    { message: "Celular invalido" }
  ),
  role: z.enum(roles, {
    errorMap: () => ({ message: "Debe seleccionar un rol" }),
  }),
});

export type TCreateUserZod = z.infer<typeof userSchema>;
export type TUserToEditZod = z.infer<typeof userToEditSchema>;

export const validateUser = (data: TCreateUserZod) => {
  return userSchema.safeParse(data);
};
