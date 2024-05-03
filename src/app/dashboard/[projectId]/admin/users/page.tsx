import { ButtonAddUser } from "@/components/pages/admin/ButtonAddUser";
import { ButtonEditUser } from "@/components/pages/admin/ButtonEditUser";
import { ErrorPage } from "@/components/shared/ErrorPage";
import { authOptions } from "@/libs/authOptions";
import { convertRoleToSpanish } from "@/libs/utils";
import { getUsersByProject } from "@/services/actions/user.actions";
import { getServerSession } from "next-auth";
import { FaUser } from "react-icons/fa";

const UsersPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <ErrorPage />;
  }
  const users = await getUsersByProject(
    session.user.project as string,
    session.user.sub as string
  );
  if (!users) {
    return <ErrorPage />;
  }

  return (
    <div className="small-container px-4">
      <div className="items-start justify-between sm:flex">
        <div>
          <h4 className="title">Usuarios</h4>
          <p className="subtitle">
            Lista de todos los usuarios registrados en el sistema.
          </p>
        </div>
        <ButtonAddUser />
      </div>
      <ul className="mt-12 divide-y">
        {users.length > 0 ? (
          users.map((item) => (
            <li
              key={item._id}
              className="py-5 flex items-start justify-between"
            >
              <div className="flex gap-3">
                <div className="flex justify-center items-center w-12 h-12 rounded-full bg-pri-900">
                  <FaUser />
                </div>
                <div className="space-y-1">
                  <span className="block text-sm text-gray-100 font-semibold">
                    {item.username}
                  </span>
                  <span className="block text-xs font-semibold text-gray-400">
                    {convertRoleToSpanish(item.role)}
                  </span>
                </div>
              </div>
              <ButtonEditUser userId={item._id} />
            </li>
          ))
        ) : (
          <p className="text-gray-300 text-center">
            No hay usuarios registrados
          </p>
        )}
      </ul>
    </div>
  );
};

export default UsersPage;
