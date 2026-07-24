
import UserCard from "@/components/AdminDashboard/ManageUsers/UsersCard";
import { getAdminUsers } from "@/lib/getData";
import { LuUsers } from "react-icons/lu";

export const metadata = {
  title: "Manage Users | ChefWorld",
};

const ManageUsersPage = async () => {
  const users = await getAdminUsers();

  return (
    <section className="w-full px-3 py-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3.5">
          <div className="shrink-0 rounded-xl bg-purple-100 p-2.5 text-purple-600 sm:p-3 dark:bg-purple-950/40 dark:text-purple-400">
            <LuUsers className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl lg:text-3xl dark:text-white">
              Manage Users
            </h1>
            <p className="text-xs text-gray-500 sm:text-sm dark:text-gray-400">
              Block / Unblock users and manage user accounts
            </p>
          </div>
        </div>

        {/* Total Users Counter */}
        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-2.5 shadow-sm sm:justify-start sm:gap-4 dark:border-gray-800 dark:bg-gray-900">
          <p className="text-xs font-medium text-gray-500 sm:text-sm dark:text-gray-400">
            Total Users
          </p>
          <h2 className="text-xl font-bold text-purple-600 sm:text-2xl dark:text-purple-400">
            {users?.length || 0}
          </h2>
        </div>
      </div>

      {/* Grid view */}
      {!users?.length ? (
        <div className="rounded-2xl border border-dashed border-gray-300 py-16 text-center text-gray-500 dark:border-gray-800 dark:text-gray-400">
          No users found.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ">
          {users.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ManageUsersPage;