import { FormUpdateUser } from "@/components/pages/admin/FormUpdateUser";
import { ErrorPage } from "@/components/shared/ErrorPage";
import { getUser } from "@/services/actions/user.actions";
import React from "react";

const EditUserPage = async ({
  params: { userId },
}: {
  params: { userId: string };
}) => {
  const user = await getUser(userId);

  if (!user) {
    return <ErrorPage />;
  }

  return <FormUpdateUser user={user} />;
};

export default EditUserPage;
