import UserRow from "./UsersRow";

const UsersTable = ({ users }) => {
  return (
    // The wrapper handles the outer border, shadows, and horizontal scrollbar on mobile
    <div className="w-full overflow-x-auto rounded-2xl border border-gray-200 shadow dark:border-gray-700">
      <table className="w-full min-w-[800px] border-collapse text-left text-sm dark:text-white">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            {/* Switched text alignment to match the data content for a cleaner layout */}
            <th className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-200">
              User
            </th>
            <th className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-200">
              Role
            </th>
            <th className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-200">
              Premium
            </th>
            <th className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-200">
              Status
            </th>
            <th className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-200">
              Joined
            </th>
            <th className="px-6 py-4 font-semibold text-center text-gray-900 dark:text-gray-200">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
          {users.map((user) => (
            <UserRow key={user._id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
