"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import {
  getAllReports,
  dismissReport,
  removeReportedRecipe,
} from "@/lib/action";
import {
  FaExclamationTriangle,
  FaTrashAlt,
  FaTimesCircle,
} from "react-icons/fa";

export default function AdminReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  // Fetch Reports
  const fetchReportsData = async () => {
    setLoading(true);
    const data = await getAllReports();
    setReports(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchReportsData();
  }, []);

  // ১. Dismiss Handler
  const handleDismiss = async (reportId) => {
    setActionLoading(reportId);
    const res = await dismissReport(reportId);

    if (res?.success) {
      toast.success(res.message || "Report dismissed successfully!");
      setReports((prev) => prev.filter((r) => r._id !== reportId));
    } else {
      toast.error(res?.message || "Failed to dismiss report");
    }
    setActionLoading(null);
  };

  // ২. Remove Recipe Handler
  const handleRemoveRecipe = async (recipeId) => {
    if (
      !confirm(
        "Are you sure you want to PERMANENTLY delete this recipe and clear all related reports?",
      )
    )
      return;

    setActionLoading(recipeId);
    const res = await removeReportedRecipe(recipeId);

    if (res?.success) {
      toast.success(res.message || "Recipe removed successfully!");
      setReports((prev) => prev.filter((r) => r.recipeId !== recipeId));
    } else {
      toast.error(res?.message || "Failed to remove recipe");
    }
    setActionLoading(null);
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-gray-500 animate-pulse">Loading reports...</p>
      </div>
    );
  }

  return (
    <section className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-red-100 p-3 text-red-600 dark:bg-red-950/40">
          <FaExclamationTriangle size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold dark:text-white">Recipe Reports</h1>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Review user flags and take necessary actions.
          </p>
        </div>
      </div>

      {/* Reports Table */}
      {!reports.length ? (
        <div className="rounded-xl border border-dashed py-16 text-center text-gray-500">
          No pending reports found. Good job!
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border bg-white shadow dark:border-gray-800 dark:bg-gray-900">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-800 dark:text-gray-300">
              <tr>
                <th className="p-4">#</th>
                <th className="p-4">Recipe</th>
                <th className="p-4">Reported By</th>
                <th className="p-4">Reason</th>
                <th className="p-4">Details</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y dark:divide-gray-800">
              {reports.map((report, idx) => {
                const recipe = report.recipeDetails || report.recipeInfo;
                const isDismissing = actionLoading === report._id;
                const isRemovingRecipe = actionLoading === report.recipeId;

                return (
                  <tr
                    key={report._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="p-4 font-medium">{idx + 1}</td>

                    {/* Recipe Column */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Image
                          src={recipe?.recipeImage || ""}
                          alt={recipe?.recipeName || "Recipe"}
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-lg object-cover"
                        />
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                          {recipe?.recipeName}
                        </span>
                      </div>
                    </td>

                    {/* User Column */}
                    <td className="p-4">
                      <p className="font-medium text-gray-800 dark:text-gray-200">
                        {report.userName || "Anonymous"}
                      </p>
                      <p className="text-xs text-gray-400">
                        {report.userEmail || "N/A"}
                      </p>
                    </td>

                    {/* Reason Badge */}
                    <td className="p-4">
                      <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700 dark:bg-red-900/40 dark:text-red-300">
                        {report.reason}
                      </span>
                    </td>

                    {/* Details */}
                    <td
                      className="p-4 text-xs text-gray-500 max-w-xs truncate"
                      title={report.details}
                    >
                      {report.details || "No extra details provided"}
                    </td>

                    {/* Action Buttons */}
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        {/* 1. Dismiss Report Button */}
                        <button
                          onClick={() => handleDismiss(report._id)}
                          disabled={isDismissing || isRemovingRecipe}
                          className="flex items-center gap-1.5 rounded-lg bg-gray-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-gray-700 disabled:opacity-50"
                          title="Dismiss report and keep recipe published"
                        >
                          <FaTimesCircle />
                          {isDismissing ? "Dismissing..." : "Dismiss"}
                        </button>

                        {/* 2. Delete Recipe Button */}
                        {recipe ? (
                          <button
                            onClick={() => handleRemoveRecipe(report.recipeId)}
                            disabled={isRemovingRecipe || isDismissing}
                            className="flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-red-700 disabled:opacity-50"
                            title="Delete recipe permanently and remove all reports"
                          >
                            <FaTrashAlt />
                            {isRemovingRecipe ? "Deleting..." : "Delete Recipe"}
                          </button>
                        ) : (
                          <span className="text-xs text-gray-400 italic">
                            No Recipe
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
