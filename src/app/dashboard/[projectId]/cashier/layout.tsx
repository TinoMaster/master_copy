"use client";
import { LoaderPages } from "@/components/loaders/LoaderPages";
import { Resume } from "@/components/pages/cashier/Resume";
import { WorkersSelect } from "@/components/pages/cashier/WorkersSelect";
import { MenuInfinite } from "@/components/shared/MenuInfinite";
import { linksCashierPanel } from "@/constants";
import { useSession } from "next-auth/react";

const CashierLayout = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();

  if (status === "loading") {
    return <LoaderPages />;
  }
  return (
    <div className="relative flex flex-col justify-between min-h-[calc(100vh-80px)]">
      <div>
        <h3 className="absolute -top-6 uppercase text-xs px-2 rounded-md lg:hidden">
          Registro de ventas
        </h3>
        <MenuInfinite
          links={linksCashierPanel}
          cutPath={[3, 5]}
          position="right"
        />
        <div className="w-full flex bg-pri-500/5 rounded-md">
          <WorkersSelect />
          <WorkersSelect />
        </div>
        {children}
      </div>
      <Resume />
    </div>
  );
};

export default CashierLayout;
