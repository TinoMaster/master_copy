import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const SelectWorkers = () => {
  return (
    <div className="w-full sm:w-min p-5 space-y-4 rounded-md">
      <h4 className="head-title-banner">Trabajadores de turno</h4>
      <div className="w-[180px]">
        <Select>
          <SelectTrigger className="">
            <SelectValue placeholder="Seleccione trabajador" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Trabajadores</SelectLabel>
              <SelectItem value="apple">Bryam</SelectItem>
              <SelectItem value="banana">Nysaer</SelectItem>
              <SelectItem value="blueberry">Jorge</SelectItem>
              <SelectItem value="grapes">Daniel</SelectItem>
              <SelectItem value="pineapple">Javier</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
