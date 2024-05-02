import { FormCreateBusiness } from "@/components/pages/admin/business/FormCreateBusiness";
import { ErrorPage } from "@/components/shared/ErrorPage";
import { authOptions } from "@/libs/authOptions";
import { getServerSession } from "next-auth";

export default async function RegisterBusinessPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <ErrorPage />;
  }

  return <FormCreateBusiness session={session} />;
}
