import { ButtonAddUser } from "@/components/pages/admin/ButtonAddUser";
import { ButtonEditUser } from "@/components/pages/admin/ButtonEditUser";
import { ErrorPage } from "@/components/shared/ErrorPage";
import { getUsers } from "@/services/actions/user.actions";
import { FaUser } from "react-icons/fa";

const UsersPage = async () => {
  const users = await getUsers();
  if (!users) {
    return <ErrorPage />;
  }

  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="items-start justify-between sm:flex">
        <div>
          <h4 className="text-3xl font-semibold">Usuarios</h4>
          <p className="mt-2 text-gray-300 text-base sm:text-sm">
            Lista de todos los usuarios registrados en el sistema.
          </p>
        </div>
        <ButtonAddUser />
      </div>
      <ul className="mt-12 divide-y">
        {users.map((item) => (
          <li key={item._id} className="py-5 flex items-start justify-between">
            <div className="flex gap-3">
              <div className="flex justify-center items-center w-12 h-12 rounded-full bg-pri-900">
                <FaUser />
              </div>
              <div>
                <span className="block text-sm text-gray-100 font-semibold">
                  {item.name}
                </span>
                <span className="block text-sm text-gray-300">
                  {item.email}
                </span>
              </div>
            </div>
            <ButtonEditUser userId={item._id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;
