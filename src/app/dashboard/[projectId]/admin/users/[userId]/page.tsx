import { FormUpdateUser } from "@/components/pages/admin/users/FormUpdateUser";
import { ErrorPage } from "@/components/shared/ErrorPage";
import { authOptions } from "@/libs/authOptions";
import { getBusinessByProject } from "@/services/actions/business.actions";
import { getUser } from "@/services/actions/user.actions";
import { getServerSession } from "next-auth";
import React from "react";

const EditUserPage = async ({
  params: { userId },
}: {
  params: { userId: string };
}) => {
  const session = await getServerSession(authOptions);
  const business = await getBusinessByProject(session?.user.project as string);
  const user = await getUser(userId);

  if (!user || !business) {
    return <ErrorPage />;
  }

  return <FormUpdateUser user={user} business={business} />;
};

export default EditUserPage;
