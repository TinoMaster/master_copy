import { Resume } from "@/components/pages/cashier/Resume";
import { MenuInfinite } from "@/components/shared/MenuInfinite";
import { linksCashierPanel } from "@/constants";

const CashierLayout = ({ children }: { children: React.ReactNode }) => {
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
        {children}
      </div>
      <Resume />
    </div>
  );
};

export default CashierLayout;
