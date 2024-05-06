import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { dailyBalance } from "@/constants/inputs";
import React from "react";

export const FormDailyBalance = () => {
  return (
    <form className="flex flex-col gap-4 p-5 rounded-md justify-between">
      <div className="space-y-4">
        <h4 className="head-title-banner">Cuadre Diario</h4>
        <div className="grid gap-4">
          {dailyBalance.map((input) => (
            <div key={input.id} className="flex flex-col">
              <label htmlFor="" className="label">
                {input.label}
              </label>
              <Input type="text" className="input" />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col px-2">
        <div className="flex justify-end gap-2 mt-2">
          <Button
            type="button"
            className="bg-gray-300/80 hover:bg-gray-300 text-gray-800"
          >
            Reiniciar
          </Button>
          <Button type="submit" className="bg-green-500/80 hover:bg-green-500">
            Salvar
          </Button>
        </div>
      </div>
    </form>
  );
};
