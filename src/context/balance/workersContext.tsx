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
      setSelectedWorkers([
        ...selectedWorkers,
        workersListByBusiness.find((w) => w.id === workerId)!,
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
