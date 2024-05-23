"use client";
import { FormDailyBalance } from "@/components/pages/cashier/copies/FormDailyBalance";
import { FormMoneyBreakdown } from "@/components/pages/cashier/copies/FormMoneyBreakdown";
import { SelectBusiness } from "@/components/pages/cashier/copies/SelectBusiness";
import { SelectDate } from "@/components/pages/cashier/copies/SelectDate";
import { SelectWorkers } from "@/components/pages/cashier/copies/SelectWorkers";
import { useBusiness } from "@/context/balance/businessContext";
import { useDate } from "@/context/balance/dateContext";
import { useWorkers } from "@/context/balance/workersContext";
import { checkRolePermission } from "@/libs/utils";
import { useSession } from "next-auth/react";

export interface SelectedWorker {
  name: string;
  id: string;
}

const CashierPage = () => {
  const { status, data: session } = useSession();
  const { businesses, onChangeBusinesses, selectedBusiness } = useBusiness();
  const {
    onChangeWorkers,
    onDeleteWorker,
    selectedWorkers,
    workersListByBusiness,
  } = useWorkers();
  const { onChangeDate } = useDate();

  if (status === "loading")
    return (
      <div className="w-full h-[calc(100vh-280px)] rounded-md flex flex-col gap-4">
        <div className="w-full h-32 bg-black/5 rounded-md animate-pulse"></div>
        <div className="w-full grow bg-black/5 rounded-md animate-pulse"></div>
      </div>
    );

  return (
    <div className="w-full space-y-4">
      {/* Choosing workers */}
      <div className="w-full flex flex-wrap rounded-md">
        <SelectBusiness
          selectedBusiness={selectedBusiness}
          businesses={businesses}
          onChangeBusiness={onChangeBusinesses}
        />
        <SelectWorkers
          workers={workersListByBusiness}
          handleChange={onChangeWorkers}
          onDeleteWorker={onDeleteWorker}
          selectedWorkers={selectedWorkers.map((worker) => {
            return { name: worker.name, id: worker.id };
          })}
          selectedBusiness={!!selectedBusiness._id}
        />
        <SelectDate
          onChangeDate={onChangeDate}
          disabled={
            !checkRolePermission(session?.user?.role ?? "owner", "admin")
          }
        />
      </div>

      <div className="w-full grid xl:grid-cols-2 gap-4 rounded-md">
        <FormMoneyBreakdown />
        <FormDailyBalance />
      </div>
    </div>
  );
};

export default CashierPage;
