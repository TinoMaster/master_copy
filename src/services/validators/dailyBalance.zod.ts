import { z } from "zod";

export const dailyBalanceSchema = z.object({
  dateId: z
    .string()
    .min(1, "La fecha es requerida")
    .refine((value) => {
      const regex = /^\d{8}-\d{24}$/;
      return regex.test(value);
    }, "Fecha invalida"),
  date: z
    .string()
    .min(1, "La fecha es requerida")
    .refine((value) => {
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      return regex.test(value);
    }, "Fecha invalida")
    .transform((value) => new Date(value)),
  total: z
    .string()
    .refine((value) => {
      const regex = /^\d+$/;
      return regex.test(value);
    }, "Total invalido")
    .transform((value) => parseInt(value)),
  business: z.string().min(1, "El negocio es requerido"),
  workers: z
    .array(
      z.object({
        worker: z.string().min(1, "El trabajador es requerido"),
        salary: z
          .string()
          .refine((value) => {
            const regex = /^\d+$/;
            return regex.test(value);
          }, "Salario invalido")
          .transform((value) => parseInt(value)),
        salaryType: z.object({
          percentage: z
            .string()
            .refine((value) => {
              const regex = /^\d+$/;
              return regex.test(value);
            }, "Porcentaje invalido")
            .transform((value) => parseInt(value)),
          fixed: z
            .string()
            .refine((value) => {
              const regex = /^\d+$/;
              return regex.test(value);
            }, "Salario invalido")
            .transform((value) => parseInt(value)),
        }),
        discount: z.object({
          percentage: z
            .string()
            .refine((value) => {
              const regex = /^\d+$/;
              return regex.test(value);
            }, "Porcentaje invalido")
            .transform((value) => parseInt(value)),
          fixed: z
            .string()
            .refine((value) => {
              const regex = /^\d+$/;
              return regex.test(value);
            }, "Salario invalido")
            .transform((value) => parseInt(value)),
        }),
      })
    )
    .min(1, "Los trabajadores son requeridos"),
  businessSalary: z
    .string()
    .refine((value) => {
      const regex = /^\d+$/;
      return regex.test(value);
    }, "Salario invalido")
    .transform((value) => parseInt(value)),
});
