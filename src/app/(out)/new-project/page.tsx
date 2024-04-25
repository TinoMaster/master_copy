import DeniedPage from "@/app/denied/page";
import { FormCreateProject } from "@/components/shared/out/FormCreateProject";
import { authOptions } from "@/libs/authOptions";
import { getUser } from "@/services/actions/user.actions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const NewProjectPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <DeniedPage />;
  }
  const user = await getUser(session?.user?.sub as string);

  if (user?.project) redirect("/");

  return (
    <div className="container py-28">
      <FormCreateProject userId={session.user.sub as string} />
    </div>
  );
};

export default NewProjectPage;
