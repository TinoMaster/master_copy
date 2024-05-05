import { formatPrice } from "@/libs/utils";
import React from "react";
import { FaFilter } from "react-icons/fa";
import { LuListFilter } from "react-icons/lu";

export const Profits = () => {
  return (
    <div className="flex flex-col gap-4 p-3 bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 shadow rounded-md">
      <div className="flex justify-between items-center">
        <h4 className="head-title-banner text-gray-100">Ingresos</h4>
        <div className="flex gap-2 items-center">
          <small className="mini-subtitle">General</small>
          <FaFilter />
        </div>
      </div>
      <div className="flex flex-col grow justify-between">
        <div className="flex justify-between items-center h-1/2">
          <h5 className="title-banner text-gray-100">Total:</h5>
          <h5 className="mini-title text-gray-200">{formatPrice(151245)}</h5>
        </div>
        <div className="flex justify-between items-center h-1/2">
          <div className="flex gap-2 items-center">
            <h5 className="title-banner text-gray-100">Ganancia:</h5>
            <small className="bg-white/5 text-white shadow rounded-md p-2">
              <LuListFilter className="" />
            </small>
          </div>
          <h5 className="mini-title text-gray-200">{formatPrice(31245)}</h5>
        </div>
      </div>
    </div>
  );
};
