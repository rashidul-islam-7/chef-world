export default function ReportFilterBar({
  searchQuery,
  setSearchQuery,
  selectedReason,
  setSelectedReason,
  reasonsList,
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <input
        type="text"
        placeholder="Search by recipe, user name, or email..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full rounded-lg border px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-red-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:w-72"
      />

      <div className="flex items-center gap-2">
        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
          Filter Reason:
        </label>
        <select
          value={selectedReason}
          onChange={(e) => setSelectedReason(e.target.value)}
          className="rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        >
          <option value="ALL">All Reasons</option>
          {reasonsList.map((reason) => (
            <option key={reason} value={reason}>
              {reason}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
