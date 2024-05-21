"use client";
import { FormDailyBalance } from "@/components/pages/cashier/copies/FormDailyBalance";
import { FormMoneyBreakdown } from "@/components/pages/cashier/copies/FormMoneyBreakdown";
import { SelectBusiness } from "@/components/pages/cashier/copies/SelectBusiness";
import { SelectDate } from "@/components/pages/cashier/copies/SelectDate";
import { SelectWorkers } from "@/components/pages/cashier/copies/SelectWorkers";
import useBalance from "@/context/balanceContext";
import { checkRolePermission } from "@/libs/utils";
import { useSession } from "next-auth/react";

export interface SelectedWorker {
  name: string;
  id: string;
}

const CashierPage = () => {
  const { status, data: session } = useSession();
  const {
    businesses,
    onChangeBusinesses,
    workers,
    onChangeWorkers,
    onDeleteWorker,
    onChangeDate,
    balance,
  } = useBalance();

  const selectedWorkers: SelectedWorker[] = balance.workers.map((worker) => ({
    name: worker.name,
    id: worker.id,
  }));

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
          businesses={businesses}
          onChangeBusiness={onChangeBusinesses}
        />
        <SelectWorkers
          workers={workers}
          handleChange={onChangeWorkers}
          onDeleteWorker={onDeleteWorker}
          selectedWorkers={selectedWorkers}
          selectedBusiness={!!balance.business}
        />
        <SelectDate
          onChangeDate={onChangeDate}
          disabled={!checkRolePermission(
            session?.user?.role ?? "owner",
            "admin"
          )}
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
