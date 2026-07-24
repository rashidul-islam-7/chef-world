import UserStatusBadge from "./UserStatusBadge";
import BlockButton from "./BlockButton";
import {
  LuShieldAlert,
  LuUser,
  LuCrown,
  LuSparkles,
  LuCalendar,
} from "react-icons/lu";

export default function UserCard({ user }) {
  const formattedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "N/A";

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-col gap-3.5">
        {/* Profile Header & Basic Info */}
        <div className="flex items-start gap-3">
          <div className="relative h-12 w-12 shrink-0">
            <img
              src={user?.image || "/default-avatar.png"}
              alt={user?.name || "User Avatar"}
              fill
              sizes="48px"
              className="rounded-full border border-gray-200 object-cover shadow-sm dark:border-gray-700"
            />
          </div>

          <div className="min-w-0 flex-1">
            <h3
              className="truncate text-base font-bold text-gray-900 dark:text-white"
              title={user?.name}
            >
              {user?.name || "Unnamed User"}
            </h3>
            <p
              className="truncate text-xs text-gray-500 dark:text-gray-400"
              title={user?.email}
            >
              {user?.email}
            </p>
          </div>
        </div>

        {/* Badges Bar (Role & Premium) */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Role Badge */}
          {user?.role === "admin" ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-purple-200 bg-purple-50 px-2.5 py-1 text-xs font-semibold text-purple-700 dark:border-purple-900/50 dark:bg-purple-950/40 dark:text-purple-300">
              <LuShieldAlert className="text-sm" />
              Admin
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full border border-orange-200 bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-700 dark:border-orange-900/50 dark:bg-orange-950/40 dark:text-orange-300">
              <LuUser className="text-sm" />
              User
            </span>
          )}

          {/* Premium / Tier Badge */}
          {user?.isPremium ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-green-200 bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700 dark:border-green-900/50 dark:bg-green-950/40 dark:text-green-300">
              <LuCrown className="text-sm" />
              Premium
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-300">
              <LuSparkles className="text-sm" />
              Free
            </span>
          )}
        </div>

        {/* Metadata: Joined Date & Status */}
        <div className="space-y-2 rounded-xl border border-gray-100 bg-gray-50/80 p-3 text-xs dark:border-gray-800/80 dark:bg-gray-800/40">
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
              <LuCalendar className="text-gray-400" /> Joined
            </span>
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {formattedDate}
            </span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="text-gray-500 dark:text-gray-400">Status</span>
            <UserStatusBadge blocked={user?.isBlocked} />
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-4 border-t border-gray-100 pt-3 dark:border-gray-800">
        <BlockButton user={user} />
      </div>
    </div>
  );
}
