import TransactionCard from "@/components/AdminDashboard/Transactions/TransactionCard";
import { getAllTransactions } from "@/lib/getData";
import { LuReceipt, LuDollarSign } from "react-icons/lu";

export const metadata = {
  title: "Transactions | ChefWorld Admin",
  description: "View all premium subscriptions and recipe purchases.",
};

const TransactionsPage = async () => {
  // Fetch combined transactions data from server
  const transactions = await getAllTransactions();

  // Calculate Total Revenue
  const totalRevenue = transactions.reduce(
    (sum, item) => sum + (Number(item.amount) || 0),
    0,
  );

  return (
    <section className="w-full px-3 py-4 sm:px-6 lg:px-8">
      {/* Page Header Section */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3.5">
          <div className="shrink-0 rounded-xl bg-green-100 p-2.5 text-green-600 sm:p-3 dark:bg-green-950/40 dark:text-green-400">
            <LuReceipt className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl lg:text-3xl dark:text-white">
              Transactions History
            </h1>
            <p className="text-xs text-gray-500 sm:text-sm dark:text-gray-400">
              Overview of Premium Memberships & Purchased Recipes
            </p>
          </div>
        </div>

        {/* Revenue Counter Card */}
        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-2.5 shadow-sm sm:justify-start sm:gap-4 dark:border-gray-800 dark:bg-gray-900">
          <p className="text-xs font-medium text-gray-500 sm:text-sm dark:text-gray-400">
            Total Revenue
          </p>
          <h2 className="flex items-center text-xl font-bold text-green-600 sm:text-2xl dark:text-green-400">
            <LuDollarSign />
            {totalRevenue.toFixed(2)}
          </h2>
        </div>
      </div>

      {/* Grid List of Transaction Cards */}
      {!transactions?.length ? (
        <div className="rounded-2xl border border-dashed border-gray-300 py-16 text-center text-gray-500 dark:border-gray-800 dark:text-gray-400">
          No transactions recorded yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {transactions.map((transaction) => (
            <TransactionCard key={transaction._id} transaction={transaction} />
          ))}
        </div>
      )}
    </section>
  );
};

export default TransactionsPage;
