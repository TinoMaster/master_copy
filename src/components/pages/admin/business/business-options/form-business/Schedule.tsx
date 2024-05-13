"use client";
import { dayHours, daysOfTheWeek, initialSchedules } from "@/constants";
import { higherHourRange, lowerHourRange } from "@/libs/utils";
import { TBusinessUpdateZod } from "@/services/validators/business.zod";
import React, { useEffect, useState } from "react";
import { UseFormClearErrors, UseFormSetValue } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface ISchedule {
  day: string;
  openingTime: string;
  closingTime: string;
}

export const Schedule = ({
  index,
  schedules,
  setValue,
  clearErrors,
}: {
  index: number;
  schedules: ISchedule[];
  setValue: UseFormSetValue<TBusinessUpdateZod>;
  clearErrors: UseFormClearErrors<TBusinessUpdateZod>;
}) => {
  const [schedulesState, setSchedulesState] = useState<ISchedule[]>(
    schedules.length === 0 ? initialSchedules : schedules
  );

  useEffect(() => {
    if (schedulesState !== initialSchedules && schedulesState !== schedules) {
      setValue("schedules", schedulesState, {
        shouldDirty: true,
      });
    }
  }, [schedulesState, setValue, schedules]);

  function handleChange(
    name: "openingTime" | "closingTime",
    value: string,
    index: number
  ) {
    clearErrors("schedules");
    setSchedulesState((prev) => {
      return prev.map((item, i) => {
        if (i === index) {
          return { ...item, [name]: value };
        }
        return item;
      });
    });
  }

  return (
    <div className="space-y-10">
      <div>
        <h3 className="mini-title">Horarios</h3>
        {index === 0 && (
          <p className="mini-subtitle">
            Configura los horarios de tu negocio. Para seleccionar la opción de
            CERRADO escriba &quot;00:00&quot; en ambos campos.
          </p>
        )}
      </div>
      {daysOfTheWeek.map((day, index) => {
        const openHour = schedulesState[index]?.openingTime ?? "00:00";
        const closeHour = schedulesState[index]?.closingTime ?? "00:00";
        return (
          <div key={day} className="flex justify-between items-center px-2">
            <p className="">{day}</p>
            <div className="flex gap-2">
              <Select
                onValueChange={(value) =>
                  handleChange("openingTime", value, index)
                }
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder={openHour} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup defaultValue={openHour}>
                    <SelectLabel>Apertura</SelectLabel>
                    {lowerHourRange(closeHour, dayHours).map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <p>-</p>
              <Select
                onValueChange={(value) =>
                  handleChange("closingTime", value, index)
                }
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder={closeHour} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup defaultValue={closeHour}>
                    <SelectLabel>Cierre</SelectLabel>
                    {higherHourRange(openHour, dayHours).map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      })}
    </div>
  );
};
