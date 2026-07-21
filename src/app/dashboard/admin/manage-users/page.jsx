export const metadata = {
  title: "Manage Users | ChefWorld",
};

import UsersTable from "@/components/AdminDashboard/ManageUsers/UsersTable";
import { getAdminUsers } from "@/lib/getData";

const ManageUsersPage = async () => {
  const users = await getAdminUsers();

  return (
    <section className="p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold dark:text-white">
          Manage Users
          <span className="ml-2">👥</span>
        </h1>

        <p className="text-gray-500 mt-2 dark:text-gray-300">
          Block / Unblock users and manage accounts
        </p>
      </div>

      <UsersTable users={users} />
    </section>
  );
};

export default ManageUsersPage;
