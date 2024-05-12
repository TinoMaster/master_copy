import { FormCreateUser } from "@/components/pages/admin/users/FormCreateUser";
import { ErrorPage } from "@/components/shared/ErrorPage";
import { authOptions } from "@/libs/authOptions";
import { getBusinessByProject } from "@/services/actions/business.actions";
import { getServerSession } from "next-auth";

export default async function Register() {
  const session = await getServerSession(authOptions);
  const business = await getBusinessByProject(session?.user.project as string);

  if (!session?.user.project || !business) {
    return <ErrorPage />;
  }

  return (
    <FormCreateUser projectId={session.user.project} business={business} />
  );
}
