import { FormCreateUser } from "@/components/pages/admin/FormCreateUser";
import { ErrorPage } from "@/components/shared/ErrorPage";
import { authOptions } from "@/libs/authOptions";
import { getServerSession } from "next-auth";

export default async function Register() {
  const session = await getServerSession(authOptions);
  if (!session?.user.project) {
    return <ErrorPage />;
  }

  return <FormCreateUser projectId={session.user.project} />;
}
