import { z } from "zod";

export type Role = "admin" | "user" | "worker";
const roles = ["admin", "user", "worker"] as const;

export const loginSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string(),
});

export const adminSchema = z.object({
  email: z.string().min(1, "El correo es requerido").email("Correo inválido"),
  username: z
    .string()
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  role: z.enum(roles),
});

export const editAdminSchema = z.object({
  username: z
    .string()
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
  email: z.string().email("Correo inválido"),
  phone: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (!value) return true;
        const regex = /^\d{8}$/;
        return regex.test(value);
      },
      { message: "Celular invalido" }
    ),
});

export const workerSchema = z
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

export const workerToEditSchema = z.object({
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

export type TLoginZod = z.infer<typeof loginSchema>;
export type TAdminZod = z.infer<typeof adminSchema>;
export type TEditAdminZod = z.infer<typeof editAdminSchema>;
export type TWorkerZod = z.infer<typeof workerSchema>;
export type TWorkerToEditZod = z.infer<typeof workerToEditSchema>;
