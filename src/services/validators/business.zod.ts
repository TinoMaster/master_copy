import { z } from "zod";

export const businessSchema = z.object({
  name: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(50, "El nombre no puede tener mas de 50 caracteres"),
  owner: z.string().min(1, "El propietario es requerido"),
  project: z.string().min(1, "El proyecto es requerido"),
  description: z.string(),
  status: z.string(),
  workers: z.array(z.string()).optional(),
  address: z.string().min(7, "La dirección debe tener al menos 7 caracteres"),
  municipality: z.string().min(1, "La localidad es requerida"),
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
  schedules: z
    .array(
      z.object({
        day: z.string(),
        openingTime: z.string(),
        closingTime: z.string(),
      })
    )
    .optional(),
  statisticPermission: z.boolean(),
});

export const businessUpdateSchema = z
  .object({
    name: z
      .string()
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .max(50, "El nombre no puede tener mas de 50 caracteres"),
    description: z.string(),
    address: z.string().min(7, "La dirección debe tener al menos 7 caracteres"),
    municipality: z.string().min(1, "La localidad es requerida"),
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
    schedules: z.array(
      z.object({
        day: z.string(),
        openingTime: z.string(),
        closingTime: z.string(),
      })
    ),
    statisticPermission: z.boolean().optional(),
  })
  .refine(
    (data) => {
      let valid = true;
      data.schedules.forEach((schedule) => {
        if (
          (schedule.openingTime === "00:00" &&
            schedule.closingTime !== "00:00") ||
          (schedule.openingTime !== "00:00" && schedule.closingTime === "00:00")
        ) {
          valid = false;
        }
      });
      return valid;
    },
    {
      message: "No puede tener un horario abierto sin cerrar o viceversa",
      path: ["schedules"],
    }
  );

export type TBusinessZod = z.infer<typeof businessSchema>;
export type TBusinessUpdateZod = z.infer<typeof businessUpdateSchema>;
