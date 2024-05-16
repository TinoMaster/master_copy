"use client";

import { IDailyBalance } from "@/app/models/DailyBalance";
import { createContext, useContext, useMemo, useState } from "react";

interface IBalance
  extends Pick<
    IDailyBalance,
    | "date"
    | "total"
    | "dateId"
    | "_id"
    | "businessSalary"
    | "workers"
    | "business"
  > {}

type BalanceState = {
  balance: IBalance;
  updateBalance(newBalance: IBalance): void;
};
const BalanceContext = createContext<BalanceState | null>(null);

const initialBalance: IBalance = {
  _id: "",
  dateId: "",
  business: "",
  workers: [],
  date: new Date(),
  total: 0,
  businessSalary: 0,
};

const useBalance = (): BalanceState => {
  const context = useContext(BalanceContext);
  if (!context) throw new Error("Please use ThemeProvider in parent component");
  return context;
};

export const BalanceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [balance, setBalance] = useState<IBalance>(initialBalance);

  const updateBalance = useMemo(
    () => (newBalance: IBalance) => {
      setBalance(newBalance);
    },
    [setBalance]
  );

  const data = useMemo(
    () => ({ balance, updateBalance }),
    [balance, updateBalance]
  );
  return (
    <BalanceContext.Provider value={data}>{children}</BalanceContext.Provider>
  );
};

export default useBalance;
