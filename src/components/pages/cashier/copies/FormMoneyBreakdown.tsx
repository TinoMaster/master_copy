import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { moneyBreakdown } from "@/constants/inputs";
import { formatPrice } from "@/libs/utils";
import React from "react";

export const FormMoneyBreakdown = () => {
  return (
    <form className="flex flex-col gap-4 p-5 rounded-md">
      <h4 className="head-title-banner">
        Desglose de billetes <span className="text-gray-400">{"(opcional)"}</span>
      </h4>
      <div className="grid grid-cols-2 gap-4">
        {moneyBreakdown.map((input) => (
          <div key={input.id} className="flex flex-col">
            <label htmlFor="" className="label">
              {input.label}
            </label>
            <Input type="text" className="input" />
          </div>
        ))}
      </div>
      <div className="flex flex-col px-2">
        <div className="flex justify-end gap-2">
          <h5 className="title-banner">Total:</h5>
          <h5 className="mini-title">{formatPrice(151245)}</h5>
        </div>
        <div className="flex justify-end gap-2 mt-2">
          <Button
            type="reset"
            className="bg-gray-300/80 hover:bg-gray-300 text-gray-800"
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
