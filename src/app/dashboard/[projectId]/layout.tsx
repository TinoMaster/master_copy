import MobileNav from "@/components/shared/MobileNav";
import Sidebar from "@/components/shared/Sidebar";
import { authOptions } from "@/libs/authOptions";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

const Layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { projectId: string };
}) => {
  const projectId = params.projectId;
  const session = await getServerSession(authOptions);

  if (!session) {
    return notFound();
  }
  if (!projectId) {
    return notFound();
  }

  if (session.user.project !== projectId) {
    return notFound();
  }

  return (
    <main className="root">
      <Sidebar />
      <div className="root-container">
        <MobileNav />
        <div className="wrapper">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
