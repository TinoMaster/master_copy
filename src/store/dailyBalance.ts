import { IBalanceStore } from "@/types/dailyBalance";
import { create } from "zustand";

export const dailyBalanceStore = create<IBalanceStore>((set) => ({
  dateId: "",
  business: { _id: "", name: "" },
  workers: [],
  date: new Date(),
  total: 0,
  businessSalary: 0,
  workersSalary: 0,
  cash: 0,
  updateDailyBalance: (dailyBalance: Partial<IBalanceStore>) =>
    set((state) => ({ ...state, ...dailyBalance })),
}));
