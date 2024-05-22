"use client";
import { ReactNode } from "react";
import { DateProvider } from "@/context/balance/dateContext";
import { WorkersProvider } from "@/context/balance/workersContext";
import {
  BusinessProvider,
  useBusiness,
} from "@/context/balance/businessContext";

export const BalanceProvider = ({ children }: { children: ReactNode }) => (
  <BusinessProvider>
    <BusinessConsumer>
      {({ selectedBusiness }) => (
        <WorkersProvider selectedBusiness={selectedBusiness}>
          <DateProvider>{children}</DateProvider>
        </WorkersProvider>
      )}
    </BusinessConsumer>
  </BusinessProvider>
);

const BusinessConsumer = ({
  children,
}: {
  children: (props: { selectedBusiness: string }) => ReactNode;
}) => {
  const { selectedBusiness } = useBusiness();
  return children({ selectedBusiness });
};
