import { IBusiness } from "@/app/models/Business";
import { IDailyBalance } from "@/app/models/DailyBalance";

export interface IBalanceStore
  extends Pick<
    IDailyBalance,
    "date" | "total" | "dateId" | "businessSalary" | "business"
  > {
  workers: {
    name: string;
    id: string;
    discount: {
      percentage: number;
      fixed: number;
    };
    salary: number;
    salaryType: {
      percentage: number;
      fixed: number;
    };
  }[];
  cash: number;
  updateDailyBalance: (dailyBalance: Partial<IBalanceStore>) => void;
}

export interface IBalanceHook
  extends Pick<
    IDailyBalance,
    "date" | "total" | "dateId" | "businessSalary" | "business"
  > {
  workers: {
    name: string;
    id: string;
    discount: {
      percentage: number;
      fixed: number;
    };
    salary: number;
    salaryType: {
      percentage: number;
      fixed: number;
    };
  }[];
  cash: number;
}
