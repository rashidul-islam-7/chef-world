import Image from "next/image";
import { FaTrashAlt, FaTimesCircle } from "react-icons/fa";

export default function ReportTableRow({
  report,
  idx,
  actionLoading,
  onDismiss,
  onRemoveRecipe,
}) {
  const recipe = report.recipeDetails || report.recipeInfo;

  const isDismissing = actionLoading === report._id;
  const isRemovingRecipe = actionLoading === report.recipeId;

  return (
    <div className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-col gap-3">
        {/* Header: Serial & Reason Tag */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-2.5 dark:border-gray-800">
          <span className="text-xs font-bold text-gray-400 dark:text-gray-500">
            #{idx + 1}
          </span>
          <span className="inline-block max-w-[150px] truncate rounded-full bg-red-100 px-3 py-0.5 text-xs font-semibold text-red-700 dark:bg-red-900/40 dark:text-red-300">
            {report.reason}
          </span>
        </div>

        {/* Recipe Info Header */}
        <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-2.5 dark:bg-gray-800/50">
          {recipe?.recipeImage ? (
            <Image
              src={recipe.recipeImage}
              alt={recipe.recipeName || "Recipe"}
              width={52}
              height={52}
              className="h-13 w-13 shrink-0 rounded-lg border border-gray-200 object-cover dark:border-gray-700"
            />
          ) : (
            <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-lg bg-gray-200 text-[10px] font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400">
              No Image
            </div>
          )}

          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-medium text-gray-400">Recipe</p>
            <p
              className="line-clamp-2 text-sm font-bold text-gray-800 dark:text-gray-100"
              title={recipe?.recipeName}
            >
              {recipe?.recipeName || "Recipe Deleted"}
            </p>
          </div>
        </div>

        {/* Reported User Info */}
        <div className="flex flex-col gap-1 text-xs">
          <span className="text-gray-400">Reported by:</span>
          <div className="min-w-0">
            <p className="truncate font-semibold text-gray-800 dark:text-gray-200">
              {report.userName || "Anonymous"}
            </p>
            <p className="truncate text-gray-400">
              {report.userEmail || "N/A"}
            </p>
          </div>
        </div>

        {/* Reason Details */}
        {report.details && (
          <div className="rounded-lg border border-gray-100 bg-gray-50/80 p-2.5 dark:border-gray-800/80 dark:bg-gray-800/40">
            <span className="mb-0.5 block text-[11px] font-semibold text-gray-400">
              Details:
            </span>
            <p className="line-clamp-3 break-words text-xs text-gray-600 leading-relaxed dark:text-gray-300">
              {report.details}
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex items-center gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
        <button
          onClick={() => onDismiss(report._id)}
          disabled={isDismissing || isRemovingRecipe}
          className=" cursor-pointer flex flex-1 items-center justify-center gap-1 rounded-lg bg-gray-600 py-2 px-3 text-xs font-medium text-white transition hover:bg-gray-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <FaTimesCircle className="shrink-0 text-sm" />
          <span>{isDismissing ? "Dismissing..." : "Dismiss"}</span>
        </button>

        {recipe ? (
          <button
            onClick={() => onRemoveRecipe(report.recipeId)}
            disabled={isRemovingRecipe || isDismissing}
            className="cursor-pointer flex flex-1 items-center justify-center gap-1 rounded-lg bg-red-600 py-2 px-3 text-xs font-medium text-white transition hover:bg-red-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FaTrashAlt className="shrink-0 text-sm" />
            <span>{isRemovingRecipe ? "Deleting..." : "Delete"}</span>
          </button>
        ) : (
          <div className="flex-1 text-center py-1">
            <span className="text-xs italic text-gray-400">Recipe Removed</span>
          </div>
        )}
      </div>
    </div>
  );
}
