import { MenuInfinite } from "@/components/shared/MenuInfinite";
import { linksCashierPanel } from "@/constants";

const CashierLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      <h3 className="absolute -top-6 uppercase text-xs bg-lightDarkMode px-2 rounded-md lg:hidden">
        Registro de ventas
      </h3>
      <MenuInfinite links={linksCashierPanel} cutPath={[3, 5]} position="right" />
      {children}
    </div>
  );
};

export default CashierLayout;
