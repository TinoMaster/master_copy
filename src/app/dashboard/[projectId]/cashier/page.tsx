import { FormDailyBalance } from "@/components/pages/cashier/copies/FormDailyBalance";
import { FormMoneyBreakdown } from "@/components/pages/cashier/copies/FormMoneyBreakdown";
import { SelectBusiness } from "@/components/pages/cashier/copies/SelectBusiness";
import { SelectDate } from "@/components/pages/cashier/copies/SelectDate";
import { SelectWorkers } from "@/components/pages/cashier/copies/SelectWorkers";
const CashierPage = () => {
  return (
    <div className="w-full space-y-4">
      {/* Choosing workers */}
      <div className="w-full flex flex-wrap rounded-md">
        <SelectWorkers />
        <SelectBusiness />
        <SelectDate />
      </div>

      <div className="w-full grid xl:grid-cols-2 gap-4">
        <FormMoneyBreakdown />
        <FormDailyBalance />
      </div>
    </div>
  );
};

export default CashierPage;
