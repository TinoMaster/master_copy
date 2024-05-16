"use client";
import { FormDailyBalance } from "@/components/pages/cashier/copies/FormDailyBalance";
import { FormMoneyBreakdown } from "@/components/pages/cashier/copies/FormMoneyBreakdown";
import { SelectBusiness } from "@/components/pages/cashier/copies/SelectBusiness";
import { SelectDate } from "@/components/pages/cashier/copies/SelectDate";
import { SelectWorkers } from "@/components/pages/cashier/copies/SelectWorkers";
import { useSession } from "next-auth/react";
const CashierPage = () => {
  const { status } = useSession();
  if (status === "loading")
    return (
      <div className="w-full h-[calc(100vh-280px)] rounded-md flex flex-col gap-4">
        <div className="w-full h-32 bg-black/5 rounded-md animate-pulse"></div>
        <div className="w-full grow bg-black/5 rounded-md animate-pulse"></div>
      </div>
    );

  return (
    <form className="w-full space-y-4">
      {/* Choosing workers */}
      <div className="w-full flex flex-wrap rounded-md">
        <SelectWorkers />
        <SelectBusiness />
        <SelectDate />
      </div>

      <div className="w-full grid xl:grid-cols-2 gap-4 rounded-md">
        <FormMoneyBreakdown />
        <FormDailyBalance />
      </div>
    </form>
  );
};

export default CashierPage;
