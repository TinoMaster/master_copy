"use client";
import { dayHours } from "@/constants";
import React, { useState } from "react";

export const Schedule = ({ index }: { index: number }) => {
  //TODO: add functionality
  const [openingDays, setOpeningDays] = useState([
    {
      day: "Lunes",
      openingTime: "00:00",
      closingTime: "00:00",
    },
  ]);

  return (
    <div className="space-y-10">
      <div>
        <h3 className="mini-title">Horarios</h3>
        {index === 0 && (
          <p className="mini-subtitle">Configura los horarios de tu negocio.</p>
        )}
      </div>
      <div className="flex justify-between items-center px-2">
        <p className="">Lunes</p>
        <div className="flex gap-2">
          <select name="openingTime" id="openingTime" className="bg-gray-800">
            {dayHours.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <p>-</p>
          <select name="openingTime" id="openingTime" className="bg-gray-800">
            {dayHours.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
