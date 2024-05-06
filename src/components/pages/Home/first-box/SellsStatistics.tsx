import { formatPrice } from "@/libs/utils";
import React from "react";
import { FaEye } from "react-icons/fa";

export const SellsStatistics = () => {
  return (
    <div className="flex flex-col gap-4 p-3 shadow rounded-md bg-white">
      <div className="flex justify-between items-center">
        <h4 className="head-title-banner">Estadísticas de Ventas</h4>
      </div>
      <div className="flex flex-col grow justify-between">
        <div className="flex justify-between items-center h-1/2">
          <div className="flex gap-2 items-center">
            <h5 className="mini-title">Mejor Venta:</h5>
            <small className="bg-white/5 outline outline-1 outline-gray-400/30 rounded-md p-2">
              <FaEye className="" />
            </small>
          </div>
          <p className="">{formatPrice(13258)}</p>
        </div>
        <div className="flex justify-between items-center h-1/2">
          <div className="flex gap-2 items-center">
            <h5 className="mini-title">Mejor Mes:</h5>
            <small className="bg-white/5 shadow rounded-md p-2">
              <FaEye className="" />
            </small>
          </div>
          <p className="">Enero 2022</p>
        </div>
        <div className="flex justify-between items-center h-1/2">
          <div className="flex gap-2 items-center">
            <h5 className="mini-title">Peor Mes:</h5>
            <small className="bg-white/5 shadow rounded-md p-2">
              <FaEye className="" />
            </small>
          </div>
          <p className="">Diciembre 2021</p>
        </div>
        <div className="flex justify-between items-center h-1/2">
          <div className="flex gap-2 items-center">
            <h5 className="mini-title">Mejor Turno:</h5>
            <small className="bg-white/5 shadow rounded-md p-2">
              <FaEye className="" />
            </small>
          </div>
          <p className="">Jorge | Bryam</p>
        </div>
      </div>
    </div>
  );
};
