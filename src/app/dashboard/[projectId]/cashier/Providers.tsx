"use client";
import { ReactNode } from "react";
import { DateProvider } from "@/context/balance/dateContext";
import { WorkersProvider } from "@/context/balance/workersContext";
import {
  BusinessProvider,
  useBusiness,
} from "@/context/balance/businessContext";
import { IBusiness } from "@/app/models/Business";

export const BalanceProvider = ({ children }: { children: ReactNode }) => (
  <BusinessProvider>
    <BusinessConsumer>
      {({ selectedBusiness }) => (
        <WorkersProvider selectedBusiness={selectedBusiness._id}>
          <DateProvider>{children}</DateProvider>
        </WorkersProvider>
      )}
    </BusinessConsumer>
  </BusinessProvider>
);

const BusinessConsumer = ({
  children,
}: {
  children: (props: {
    selectedBusiness: Pick<IBusiness, "_id" | "name">;
  }) => ReactNode;
}) => {
  const { selectedBusiness } = useBusiness();
  return children({ selectedBusiness });
};
