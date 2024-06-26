import { BusinessOptions } from "@/components/pages/admin/business/business-options";
import { ButtonAddBusiness } from "@/components/pages/admin/business/ButtonAddBusiness";
import { ErrorPage } from "@/components/shared/ErrorPage";
import { authOptions } from "@/libs/authOptions";
import { getBusinessByProject } from "@/services/actions/business.actions";
import { getServerSession } from "next-auth";

const BusinessPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <ErrorPage />;
  }
  const business = await getBusinessByProject(session.user.project as string);

  if (!business) {
    return <ErrorPage />;
  }
  return (
    <div className="small-container">
      <section className="w-full space-y-6">
        <div>
          <div className="mb-4 items-start justify-between sm:flex">
            <div>
              <h3 className="title">Tus Negocios</h3>
              <p className="subtitle">
                Aquí puedes configurar todos los permisos de cada uno de tus
                negocios.
              </p>
            </div>
            <ButtonAddBusiness />
          </div>
          <BusinessOptions business={business} />
        </div>
      </section>
    </div>
  );
};

export default BusinessPage;
