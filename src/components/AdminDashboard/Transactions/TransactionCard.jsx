import {
  LuUser,
  LuCalendar,
  LuHash,
  LuCrown,
  LuUtensils,
} from "react-icons/lu";

export default function TransactionCard({ transaction }) {
  const formattedDate = transaction?.paidAt
    ? new Date(transaction.paidAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "N/A";

  const isPremium = transaction?.type?.includes("Premium");

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-col gap-3.5">
        {/* Top Header: Payment Type Badge & Amount */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-2.5 dark:border-gray-800">
          {isPremium ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-purple-200 bg-purple-50 px-2.5 py-0.5 text-xs font-semibold text-purple-700 dark:border-purple-900/50 dark:bg-purple-950/40 dark:text-purple-300">
              <LuCrown className="text-sm" />
              Premium
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full border border-orange-200 bg-orange-50 px-2.5 py-0.5 text-xs font-semibold text-orange-700 dark:border-orange-900/50 dark:bg-orange-950/40 dark:text-orange-300">
              <LuUtensils className="text-sm" />
              Recipe Buy
            </span>
          )}

          <span className="text-lg font-extrabold text-green-600 dark:text-green-400">
            ${Number(transaction?.amount || 0).toFixed(2)}
          </span>
        </div>

        {/* User Info Details */}
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
            <LuUser className="h-5 w-5" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-gray-400">User Email</p>
            <h3
              className="truncate text-sm font-semibold text-gray-800 dark:text-gray-200"
              title={transaction?.userEmail}
            >
              {transaction?.userEmail || "N/A"}
            </h3>
            {transaction?.type && (
              <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                {transaction.type}
              </p>
            )}
          </div>
        </div>

        {/* Transaction Metadata Box */}
        <div className="space-y-2 rounded-xl border border-gray-100 bg-gray-50/80 p-3 text-xs dark:border-gray-800/80 dark:bg-gray-800/40">
          {/* Payment Status & Date */}
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1 font-medium text-green-600 dark:text-green-400 bg-green-100 rounded-full px-1">
              Paid
            </span>
            <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
              <LuCalendar className="text-gray-400" /> {formattedDate}
            </span>
          </div>

          {/* Transaction ID */}
          <div className="flex flex-col gap-1 border-t border-gray-200/60 pt-1.5 dark:border-gray-700/60">
            <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
              <LuHash className="text-gray-400" /> Transaction ID
            </span>
            <span
              className="truncate font-mono font-medium text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 px-2 py-1 rounded border border-gray-200 dark:border-gray-700"
              title={transaction?.transactionId}
            >
              {transaction?.transactionId || "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
