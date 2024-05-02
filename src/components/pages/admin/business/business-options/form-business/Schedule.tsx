"use client";
import { dayHours, daysOfTheWeek, initialSchedules } from "@/constants";
import { higherHourRange, lowerHourRange } from "@/libs/utils";
import { TBusinessUpdateZod } from "@/services/validators/business.zod";
import React, { useEffect, useState } from "react";
import { UseFormClearErrors, UseFormSetValue } from "react-hook-form";

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
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) {
    clearErrors("schedules");
    const { name, value } = e.target;
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
              <select
                onChange={(e) => handleChange(e, index)}
                name="openingTime"
                id="openingTime"
                className="bg-gray-800"
              >
                <option value={openHour}>{openHour}</option>
                {lowerHourRange(closeHour, dayHours).map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <p>-</p>
              <select
                onChange={(e) => handleChange(e, index)}
                name="closingTime"
                id="closingTime"
                className="bg-gray-800"
              >
                <option value={closeHour}>{closeHour}</option>
                {higherHourRange(openHour, dayHours).map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
        );
      })}
    </div>
  );
};
