import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { IBalanceHook } from "@/types/dailyBalance";
import { ListWorkersByBusiness } from "@/services/actions/user.actions";
import { dailyBalanceStore } from "@/store/dailyBalance";

type WorkersState = {
  workersListByBusiness: IBalanceHook["workers"];
  selectedWorkers: IBalanceHook["workers"];
  onChangeWorkers(workerId: string): void;
  onDeleteWorker(workerId: string): void;
};

const WorkersContext = createContext<WorkersState | null>(null);

export const useWorkers = (): WorkersState => {
  const context = useContext(WorkersContext);
  if (!context)
    throw new Error("Please use WorkersProvider in parent component");
  return context;
};

export const WorkersProvider = ({
  children,
  selectedBusiness,
}: {
  children: React.ReactNode;
  selectedBusiness: string;
}) => {
  const updateDailyBalance = dailyBalanceStore(
    (state) => state.updateDailyBalance
  );
  const [workersListByBusiness, setWorkersListByBusiness] = useState<
    IBalanceHook["workers"]
  >([]);
  const [selectedWorkers, setSelectedWorkers] = useState<
    IBalanceHook["workers"]
  >([]);

  useEffect(() => {
    if (!selectedBusiness) return;
    ListWorkersByBusiness(selectedBusiness).then((res) => {
      if (res)
        setWorkersListByBusiness(
          res.map((worker) => ({
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
          }))
        );
    });
    setSelectedWorkers([]);
  }, [selectedBusiness]);

  const onChangeWorkers = useCallback(
    (workerId: string) => {
      const worker = workersListByBusiness.find((w) => w.id === workerId);
      if (!worker) return;
      setSelectedWorkers([...selectedWorkers, worker]);

      updateDailyBalance({
        workers: [...selectedWorkers, worker],
      });
    },
    [selectedWorkers, workersListByBusiness, updateDailyBalance]
  );

  const onDeleteWorker = useCallback(
    (workerId: string) => {
      setSelectedWorkers(selectedWorkers.filter((w) => w.id !== workerId));

      updateDailyBalance({
        workers: selectedWorkers.filter((w) => w.id !== workerId),
      });
    },
    [selectedWorkers, updateDailyBalance]
  );

  const data = useMemo(() => {
    return {
      workersListByBusiness,
      selectedWorkers,
      onChangeWorkers,
      onDeleteWorker,
    };
  }, [workersListByBusiness, selectedWorkers, onChangeWorkers, onDeleteWorker]);

  return (
    <WorkersContext.Provider value={data}>{children}</WorkersContext.Provider>
  );
};
