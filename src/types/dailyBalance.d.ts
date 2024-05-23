import { IBusiness } from "@/app/models/Business";
import { IDailyBalance } from "@/app/models/DailyBalance";

export interface IBalanceStore
  extends Pick<
    IDailyBalance,
    "date" | "total" | "dateId" | "businessSalary" | "workersSalary"
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
  business: Pick<IBusiness, "_id" | "name">;
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
  found: number;
  debts: {
    name: string;
    description: string;
    value: number;
    date: Date;
  }[];
  totalDebts: number;
  cards: {
    name: string;
    description: string;
    value: number;
    date: Date;
  }[];
}
