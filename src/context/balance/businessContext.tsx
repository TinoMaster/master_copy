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
  selectedBusiness: Pick<IBusiness, "_id" | "name">;
  onChangeBusinesses(business: Pick<IBusiness, "_id" | "name">): void;
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
  const [selectedBusiness, setSelectedBusiness] = useState<
    Pick<IBusiness, "_id" | "name">
  >({
    _id: "",
    name: "",
  });

  useEffect(() => {
    if (!session) return;

    ListBusinessToBalanceByUser(session?.user?.sub as string).then((res) => {
      if (res.success && res.data) {
        setBusinesses(res.data);
        if (res.data.length === 1) {
          setSelectedBusiness({ _id: res.data[0]._id, name: res.data[0].name });
        }
      }
    });
  }, [session]);

  const onChangeBusinesses = useCallback(
    (business: Pick<IBusiness, "_id" | "name">) => {
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
