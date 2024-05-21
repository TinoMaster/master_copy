"use client";
import { IBusiness } from "@/app/models/Business";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export const SelectBusiness = ({
  businesses,
  onChangeBusiness,
}: {
  businesses: Pick<IBusiness, "_id" | "name">[];
  onChangeBusiness: (business: string) => void;
}) => {
  const [value, setValue] = useState(
    businesses.length === 1 ? businesses[0]._id : ""
  );

  const handleChange = (business: string) => {
    setValue(business);
    onChangeBusiness(business);
  };

  return (
    <div className="w-full sm:w-min p-5 space-y-4 rounded-md">
      <h4 className="head-title-banner">Elegir Negocio</h4>
      <div className="w-[180px]">
        <Select
          value={value}
          disabled={businesses.length === 1}
          onValueChange={handleChange}
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Seleccione trabajador" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Negocios</SelectLabel>
              {businesses.map((b) => (
                <SelectItem key={b._id} value={b._id}>
                  {b.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
