import { ButtonDeleteProject } from "@/components/pages/admin/project/ButtonDeleteProject";
import { Owner } from "@/components/pages/admin/project/Owner";
import { ProfileProject } from "@/components/pages/admin/project/Profile";
import { ErrorPage } from "@/components/shared/ErrorPage";
import { authOptions } from "@/libs/authOptions";
import { getProject } from "@/services/actions/project.actions";
import { getServerSession } from "next-auth";

const AdminPrincipalPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <ErrorPage />;
  }
  const project = await getProject(session.user.project as string);
  if (!project) {
    return <ErrorPage />;
  }

  return (
    <div className="small-container space-y-6">
      <section className="w-full space-y-6">
        <div className="items-start justify-between sm:flex">
          <div className="mb-4">
            <h3 className="title">Tu Proyecto</h3>
            <p className="subtitle">
              Aquí puedes configurar toda la configuración de tu proyecto.
            </p>
          </div>
          <ButtonDeleteProject />
        </div>
      </section>
      <ProfileProject project={project} />
      <Owner />
    </div>
  );
};

export default AdminPrincipalPage;
