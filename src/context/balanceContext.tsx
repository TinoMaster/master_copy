"use client";
import { IBusiness } from "@/app/models/Business";
import {
  ListBusinessToBalanceByUser,
  ListWorkersByBusiness,
} from "@/services/actions/user.actions";
import { dailyBalanceStore } from "@/store/dailyBalance";
import { IBalanceHook } from "@/types/dailyBalance";
import { useSession } from "next-auth/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const initialBalanceState: Pick<
  IBalanceHook,
  "total" | "cash" | "found" | "totalDebts"
> = {
  total: 0,
  cash: 0,
  found: 0,
  totalDebts: 0,
};

type BalanceState = {
  businesses: Pick<IBusiness, "_id" | "name">[];
  onChangeBusinesses(business: string): void;
  workersListByBusiness: IBalanceHook["workers"];
  selectedWorkers: IBalanceHook["workers"];
  selectedBusiness: string;
  onChangeWorkers(worker: string): void;
  onDeleteWorker(worker: string): void;
  onChangeDate(date: Date): void;
};
const BalanceContext = createContext<BalanceState | null>(null);

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
  /* States */
  const { updateDailyBalance } = dailyBalanceStore((state) => state);
  const { data: session } = useSession();
  const [businesses, setBusinesses] = useState<
    Pick<IBusiness, "_id" | "name">[]
  >([]);
  const [selectedBusiness, setSelectedBusiness] = useState("");
  const [workersListByBusiness, setWorkersListByBusiness] = useState<
    IBalanceHook["workers"]
  >([]);
  const [selectedWorkers, setSelectedWorkers] = useState<
    IBalanceHook["workers"]
  >([]);
  const [balance, setBalance] = useState(initialBalanceState);
  const [debts, setDebts] = useState<IBalanceHook["debts"]>([]);

  /* UseEffects */
  useEffect(() => {
    if (!session) return;
    ListBusinessToBalanceByUser(session?.user?.sub as string).then((res) => {
      if (res.success && res.data) {
        setBusinesses(res.data);
        if (res.data.length === 1) {
          setSelectedBusiness(res.data[0]._id);
        }
      }
    });
  }, [session]);

  useEffect(() => {
    if (!selectedBusiness) return;
    ListWorkersByBusiness(selectedBusiness).then((res) => {
      if (res)
        setWorkersListByBusiness(
          res.map((worker) => {
            return {
              name: worker.username,
              id: worker._id,
              salary: 0,
              salaryType: {
                percentage: worker.salaryType?.percentage ?? 0,
                fixed: worker.salaryType?.fixed ?? 0,
              },
              discount: {
                percentage: 0,
                fixed: 0,
              },
            };
          })
        );
    });
  }, [selectedBusiness]);

  /* Callbacks */

  const onChangeWorkers = useCallback(
    (workerId: string) => {
      setSelectedWorkers([
        ...selectedWorkers,
        workersListByBusiness.filter((w) => w.id === workerId).flat()[0],
      ]);
    },
    [selectedWorkers, workersListByBusiness]
  );

  const onDeleteWorker = useCallback(
    (workerId: string) => {
      setSelectedWorkers(selectedWorkers.filter((w) => w.id !== workerId));
    },
    [selectedWorkers]
  );

  const onChangeBusinesses = useCallback(
    (business: string) => {
      setSelectedBusiness(business);
      setSelectedWorkers([]);
    },
    [setSelectedBusiness, setSelectedWorkers]
  );

  const onChangeDate = useCallback(
    (date: Date) => {
      updateDailyBalance({ date });
    },
    [updateDailyBalance]
  );

  const data = useMemo(
    () => ({
      businesses,
      onChangeBusinesses,
      workersListByBusiness,
      selectedWorkers,
      selectedBusiness,
      onChangeWorkers,
      onDeleteWorker,
      onChangeDate,
    }),
    [
      businesses,
      onChangeBusinesses,
      workersListByBusiness,
      selectedWorkers,
      selectedBusiness,
      onChangeWorkers,
      onDeleteWorker,
      onChangeDate,
    ]
  );
  return (
    <BalanceContext.Provider value={data}>{children}</BalanceContext.Provider>
  );
};

export default useBalance;
