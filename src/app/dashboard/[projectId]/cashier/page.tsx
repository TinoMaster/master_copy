import { FormDailyBalance } from "@/components/pages/cashier/copies/FormDailyBalance";
import { FormMoneyBreakdown } from "@/components/pages/cashier/copies/FormMoneyBreakdown";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const CashierPage = () => {
  return (
    <div className="w-full space-y-4">
      {/* Choosing workers */}
      <div className="w-full p-5 space-y-4 rounded-md">
        <h4 className="head-title-banner">Trabajadores de turno</h4>
        <div className="w-[180px]">
          <Select>
            <SelectTrigger className="input">
              <SelectValue placeholder="Seleccione trabajador" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Trabajadores</SelectLabel>
                <SelectItem value="apple">Bryam</SelectItem>
                <SelectItem value="banana">Nysaer</SelectItem>
                <SelectItem value="blueberry">Jorge</SelectItem>
                <SelectItem value="grapes">Daniel</SelectItem>
                <SelectItem value="pineapple">Javier</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="w-full grid xl:grid-cols-2 gap-4">
        <FormMoneyBreakdown />
        <FormDailyBalance />
      </div>
    </div>
  );
};

export default CashierPage;
