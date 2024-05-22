"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { moneyBreakdown } from "@/constants/inputs";
import { formatPrice } from "@/libs/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

function getIndexValue(index: number) {
  switch (index) {
    case 0:
      return 1;
    case 1:
      return 3;
    case 2:
      return 5;
    case 3:
      return 10;
    case 4:
      return 20;
    case 5:
      return 50;
    case 6:
      return 100;
    case 7:
      return 200;
    case 8:
      return 500;
    case 9:
      return 1000;
    default:
      return 0;
  }
}

const validateInput = (value: string) => {
  if (value === "") {
    return true;
  }
  return Number(value) >= 0 && Number(value) <= 1000;
};
const message = "Ingresa un valor entre 0 y 1.000";

const MoneyBreakdownSchema = z.object({
  [moneyBreakdown[0].name]: z
    .string()
    .refine(validateInput, { message })
    .optional(),
  [moneyBreakdown[1].name]: z
    .string()
    .refine(validateInput, { message })
    .optional(),
  [moneyBreakdown[2].name]: z
    .string()
    .refine(validateInput, { message })
    .optional(),
  [moneyBreakdown[3].name]: z
    .string()
    .refine(validateInput, { message })
    .optional(),
  [moneyBreakdown[4].name]: z
    .string()
    .refine(validateInput, { message })
    .optional(),
  [moneyBreakdown[5].name]: z
    .string()
    .refine(validateInput, { message })
    .optional(),
  [moneyBreakdown[6].name]: z
    .string()
    .refine(validateInput, { message })
    .optional(),
  [moneyBreakdown[7].name]: z
    .string()
    .refine(validateInput, { message })
    .optional(),
  [moneyBreakdown[8].name]: z
    .string()
    .refine(validateInput, { message })
    .optional(),
  [moneyBreakdown[9].name]: z
    .string()
    .refine(validateInput, { message })
    .optional(),
});

type MoneyBreakdownType = z.infer<typeof MoneyBreakdownSchema>;

export const FormMoneyBreakdown = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MoneyBreakdownType>({
    resolver: zodResolver(MoneyBreakdownSchema),
  });
  const [total, setTotal] = useState(0);

  const onsubmit: SubmitHandler<MoneyBreakdownType> = async (data) => {
    console.log(data);
    setTotal(
      Object.values(data).reduce((acc, curr, index) => {
        if (!curr) {
          return acc;
        }
        return acc + Number(curr) * getIndexValue(index);
      }, 0)
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onsubmit)}
      className="flex flex-col gap-4 p-5 rounded-md relative"
    >
      <h4 className="head-title-banner">
        Desglose de billetes{" "}
        <span className="text-gray-400">{"(opcional)"}</span>
      </h4>
      <div className="grid grid-cols-2 gap-4">
        {moneyBreakdown.map((input) => (
          <div key={input.id} className="flex flex-col relative">
            <label htmlFor="" className="label">
              {input.label}
            </label>
            <Input
              type="number"
              className={`${
                errors[input.name] && "border-red-500 text-red-500"
              }`}
              {...register(input.name)}
            />
            {errors[input.name] && (
              <p className="text-red-500 absolute -bottom-4 ml-1 font-medium text-xs">
                {errors[input.name]?.message}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col px-2">
        <div className="flex justify-end gap-2">
          <h5 className="title-banner">Total:</h5>
          <h5 className="mini-title">{formatPrice(total)}</h5>
        </div>
        <div className="flex justify-end gap-2 mt-2">
          <Button
            type="reset"
            className="bg-gray-300/80 hover:bg-gray-300 text-gray-800"
            onClick={() => setTotal(0)}
          >
            Reiniciar
          </Button>
          <Button type="submit" className="bg-gray-700/80 hover:bg-gray-700">
            Confirmar
          </Button>
        </div>
      </div>
    </form>
  );
};
