import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { IBusiness } from "@/app/models/Business";
import { ListBusinessToBalanceByUser } from "@/services/actions/user.actions";
import { useSession } from "next-auth/react";
import { dailyBalanceStore } from "@/store/dailyBalance";

type BusinessState = {
  businesses: Pick<IBusiness, "_id" | "name">[];
  selectedBusiness: string;
  onChangeBusinesses(business: string): void;
};

const BusinessContext = createContext<BusinessState | null>(null);

export const useBusiness = (): BusinessState => {
  const context = useContext(BusinessContext);
  if (!context)
    throw new Error("Please use BusinessProvider in parent component");
  return context;
};

export const BusinessProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: session } = useSession();
  const updateDailyBalance = dailyBalanceStore(
    (state) => state.updateDailyBalance
  );
  const [businesses, setBusinesses] = useState<
    Pick<IBusiness, "_id" | "name">[]
  >([]);
  const [selectedBusiness, setSelectedBusiness] = useState("");

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

  const onChangeBusinesses = useCallback(
    (business: string) => {
      setSelectedBusiness(business);
      updateDailyBalance({
        business,
      });
    },
    [updateDailyBalance]
  );

  const data = useMemo(
    () => ({
      businesses,
      selectedBusiness,
      onChangeBusinesses,
    }),
    [businesses, selectedBusiness, onChangeBusinesses]
  );

  return (
    <BusinessContext.Provider value={data}>{children}</BusinessContext.Provider>
  );
};
