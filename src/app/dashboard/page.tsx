import { ErrorPage } from "@/components/shared/ErrorPage";
import { authOptions } from "@/libs/authOptions";
import { getUser } from "@/services/actions/user.actions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  const user = await getUser(session?.user?.email as string);
  if (!user) {
    return <ErrorPage />;
  }

  /* if (user.role !== "admin") {
    return <div>DashboardPage</div>;
  } */

  redirect("/dashboard/1");
};

export default DashboardPage;
