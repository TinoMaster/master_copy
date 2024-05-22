"use client";
import { SelectedWorker } from "@/app/dashboard/[projectId]/cashier/page";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IBalanceHook } from "@/types/dailyBalance";

export const SelectWorkers = ({
  workers,
  onDeleteWorker,
  handleChange,
  selectedWorkers,
  selectedBusiness,
}: {
  workers: IBalanceHook["workers"];
  onDeleteWorker: (worker: string) => void;
  handleChange: (worker: string) => void;
  selectedWorkers: SelectedWorker[];
  selectedBusiness: boolean;
}) => {
  const value = "";
  const workersToSelect = workers.filter((worker) => {
    return !selectedWorkers?.find((w) => w.id === worker.id);
  });

  return (
    <form className="w-full sm:w-min p-5 space-y-4 rounded-md relative">
      <h4 className="head-title-banner">Trabajadores de turno</h4>
      <div className="w-[180px]">
        <Select
          disabled={!selectedBusiness}
          value={value}
          onValueChange={handleChange}
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Seleccione trabajador" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Trabajadores</SelectLabel>
              {workersToSelect.map((worker) => (
                <SelectItem
                  key={worker.id}
                  value={worker.id}
                  className="capitalize"
                >
                  {worker.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full flex flex-wrap lg:justify-center items-center gap-2 ">
        {selectedWorkers?.map((worker) => (
          <div
            key={worker.id}
            className="p-1 bg-white flex gap-2 rounded-full shadow text-xs"
          >
            <span>{worker.name}</span>
            <button
              type="button"
              onClick={() => onDeleteWorker(worker.id)}
              className="rounded-md bg-red-500/30 px-1"
            >
              x
            </button>
          </div>
        ))}
      </div>
    </form>
  );
};
