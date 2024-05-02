import { z } from "zod";

export const businessSchema = z.object({
  name: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(50, "El nombre no puede tener mas de 50 caracteres"),
  owner: z.string(),
  project: z.string(),
  description: z.string(),
  status: z.string(),
  workers: z.array(z.string()).optional(),
  address: z.string(),
  municipality: z.string(),
  phone: z.string(),
  schedules: z
    .array(
      z.object({
        day: z.string(),
        openingTime: z.string(),
        closingTime: z.string(),
      })
    )
    .optional(),
  statisticPermission: z.boolean().optional(),
});

export const businessUpdateSchema = z
  .object({
    name: z
      .string()
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .max(50, "El nombre no puede tener mas de 50 caracteres"),
    description: z.string(),
    address: z.string().min(1, "La dirección es requerida"),
    municipality: z.string().min(1, "La localidad es requerida"),
    phone: z.string(),
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
