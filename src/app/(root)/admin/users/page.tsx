import { ErrorPage } from "@/components/shared/ErrorPage";
import { getUsers } from "@/services/actions/user.actions";
import Link from "next/link";
import { FaPlus, FaUser } from "react-icons/fa";

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
            Give your team members access to manage the system.
          </p>
        </div>
        <Link
          href="/admin/users/register"
          className="inline-flex items-center justify-center gap-2 p-3 mt-2 font-medium text-sm text-center text-white bg-pri-600 hover:bg-pri-500 active:bg-pri-700 rounded-lg sm:mt-0"
        >
          <FaPlus />
          Crear usuario
        </Link>
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
            <Link
              href={`/admin/users/${item._id}`}
              className="text-gray-700 text-sm border rounded-lg px-3 py-2 duration-150 bg-white hover:bg-gray-100"
            >
              Editar
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;
