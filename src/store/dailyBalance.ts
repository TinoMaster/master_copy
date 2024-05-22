import { IBalanceStore } from "@/types/dailyBalance";
import { create } from "zustand";

export const dailyBalanceStore = create<IBalanceStore>((set) => ({
  dateId: "",
  business: "",
  workers: [],
  date: new Date(),
  total: 0,
  businessSalary: 0,
  cash: 0,
  updateDailyBalance: (dailyBalance: Partial<IBalanceStore>) =>
    set((state) => ({ ...state, ...dailyBalance })),
}));
