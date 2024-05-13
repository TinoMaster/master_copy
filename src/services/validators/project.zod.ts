import { z } from "zod";
import { existProjectName } from "../actions/project.actions";
import { existBusinessName } from "../actions/business.actions";

export const projectSchema = z
  .object({
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
    status: z.string(),
    statisticPermission: z.boolean(),
  })
  .refine(
    async (data) => {
      const { projectName } = data;

      const exist = await existProjectName(projectName);

      return !exist;
    },
    {
      message: "El nombre del proyecto ya existe",
      path: ["projectName"],
    }
  )
  .refine(
    async (data) => {
      const { name } = data;
      const exist = await existBusinessName(name);

      return !exist;
    },
    {
      message: "El nombre del negocio ya existe",
      path: ["name"],
    }
  );

export type TProjectZod = z.infer<typeof projectSchema>;
