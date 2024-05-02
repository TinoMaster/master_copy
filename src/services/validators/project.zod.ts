import { z } from "zod";

export const projectSchema = z.object({
  projectName: z.string().min(1, "El nombre del proyecto es requerido"),
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string(),
  address: z.string().min(1, "La dirección es requerida"),
  municipality: z.string().min(1, "La localidad es requerida"),
  phone: z
    .string()
    .optional()
    .refine(
      (value) => {
        const regex = /^\d{8}$/;
        return value ? regex.test(value) : true;
      },
      { message: "Celular invalido" }
    ),
});

export type TProjectZod = z.infer<typeof projectSchema>;

export const validateProject = (project: TProjectZod) => {
  return projectSchema.safeParse(project);
};
