import { MenuInfinite } from "@/components/shared/MenuInfinite";
import { linksAdminPanel } from "@/constants";
import { authOptions } from "@/libs/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const AdminPageLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "admin") redirect("/");

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
