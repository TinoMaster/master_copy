import React from "react";
import { WorkerAccordion } from "./workerAccordion";
import { IBalanceStore } from "@/types/dailyBalance";
import { formatPrice } from "@/libs/utils";

export const FirstBox = ({ balance }: { balance: IBalanceStore }) => {
  return (
    <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="mb-4 bg-primary/10 rounded-md p-4 flex justify-between items-center">
          <h2 className="title">{balance.business.name}</h2>
          <p className="mini-title">{balance.date.toLocaleDateString()}</p>
        </div>

        <div className="mb-4">
          <h3 className="mini-title">Balance</h3>
          <div className="flex justify-between items-center h-1/2">
            <h5 className="">Total:</h5>
            <p className="">{formatPrice(balance.total)}</p>
          </div>
          <div className="flex justify-between items-center h-1/2">
            <h5 className="">Salario:</h5>
            <p className="">{formatPrice(balance.workersSalary)}</p>
          </div>
          <div className="flex justify-between items-center h-1/2">
            <h5 className="">Recaudado:</h5>
            <p className="">{formatPrice(balance.businessSalary)}</p>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="mini-title">Trabajadores</h3>
          {balance.workers.map((worker) => (
            <WorkerAccordion key={worker.id} worker={worker} />
          ))}
        </div>
      </div>
    </div>
  );
};
