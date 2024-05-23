import { createContext, useContext, useCallback, useMemo } from "react";
import { dailyBalanceStore } from "@/store/dailyBalance";

type DateState = {
  onChangeDate(date: Date): void;
};

const DateContext = createContext<DateState | null>(null);

export const useDate = (): DateState => {
  const context = useContext(DateContext);
  if (!context) throw new Error("Please use DateProvider in parent component");
  return context;
};

export const DateProvider = ({ children }: { children: React.ReactNode }) => {
  const updateDailyBalance = dailyBalanceStore(
    (state) => state.updateDailyBalance
  );

  const onChangeDate = useCallback(
    (date: Date) => {
      updateDailyBalance({ date });
    },
    [updateDailyBalance]
  );

  const data = useMemo(() => ({ onChangeDate }), [onChangeDate]);

  return <DateContext.Provider value={data}>{children}</DateContext.Provider>;
};
