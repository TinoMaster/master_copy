import { MenuInfinite } from "@/components/shared/MenuInfinite";
import { linksAdminPanel } from "@/constants";

const AdminPageLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      <h3 className="absolute -top-6 uppercase text-xs bg-lightDarkMode px-2 rounded-md lg:hidden">
        Panel Administrador
      </h3>
      <MenuInfinite links={linksAdminPanel} cutPath={[1, 4]} position="right" />
      {children}
    </div>
  );
};

export default AdminPageLayout;
