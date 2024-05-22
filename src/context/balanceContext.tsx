"use client";
import { IBusiness } from "@/app/models/Business";
import { IDailyBalance } from "@/app/models/DailyBalance";
import {
  ListBusinessToBalanceByUser,
  ListWorkersByBusiness,
} from "@/services/actions/user.actions";
import { useSession } from "next-auth/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

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

type BalanceState = {
  balance: IBalanceHook;
  businesses: Pick<IBusiness, "_id" | "name">[];
  onChangeBusinesses(business: string): void;
  workers: IBalanceHook["workers"];
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

const initialBalance: IBalanceHook = {
  dateId: "",
  business: "",
  workers: [],
  date: new Date(),
  total: 0,
  businessSalary: 0,
  cash: 0,
};

export const BalanceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [balance, setBalance] = useState<IBalanceHook>(initialBalance);
  const { data: session } = useSession();
  const [businesses, setBusinesses] = useState<
    Pick<IBusiness, "_id" | "name">[]
  >([]);
  const [workers, setWorkers] = useState<IBalanceHook["workers"]>([]);

  /* UseEffects */
  useEffect(() => {
    if (!session) return;
    ListBusinessToBalanceByUser(session?.user?.sub as string).then((res) => {
      if (res.success && res.data) {
        setBusinesses(res.data);
        if (res.data.length === 1) {
          setBalance({ ...balance, business: res.data[0]._id });
        }
      }
    });
  }, [session]);

  useEffect(() => {
    if (!balance.business) return;
    ListWorkersByBusiness(balance.business).then((res) => {
      if (res)
        setWorkers(
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
  }, [balance.business]);

  /* Callbacks */

  const onChangeWorkers = useCallback(
    (workerId: string) => {
      setBalance({
        ...balance,
        workers: [
          ...balance.workers,
          workers.filter((w) => w.id === workerId).flat()[0],
        ],
      });
    },
    [balance, workers]
  );

  const onDeleteWorker = useCallback(
    (workerId: string) => {
      setBalance({
        ...balance,
        workers: balance.workers.filter((w) => w.id !== workerId),
      });
    },
    [balance]
  );

  const onChangeBusinesses = useCallback(
    (business: string) => {
      setBalance({ ...balance, business, workers: [] });
    },
    [balance]
  );

  const onChangeDate = useCallback(
    (date: Date) => {
      setBalance({ ...balance, date });
    },
    [balance]
  );

  const data = useMemo(
    () => ({
      balance,
      businesses,
      onChangeBusinesses,
      workers,
      onChangeWorkers,
      onDeleteWorker,
      onChangeDate,
    }),
    [
      balance,
      businesses,
      onChangeBusinesses,
      workers,
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
