"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaExclamationTriangle } from "react-icons/fa";

import EmptyState from "@/components/AdminDashboard/ReportRecipes/EmptyState";
import ReportCard from "@/components/AdminDashboard/ReportRecipes/ReportCard";
import {
  dismissReport,
  getAllReports,
  removeReportedRecipe,
} from "@/lib/action";
import Loading from "@/components/Loading";

export default function AdminReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  // Fetch Reports Data
  const fetchReportsData = async () => {
    setLoading(true);
    const data = await getAllReports();
    setReports(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchReportsData();
  }, []);

  // Dismiss Handler
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

  // Remove Recipe Handler
  const handleRemoveRecipe = async (recipeId) => {
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
      <div className="">
        <Loading />
      </div>
    );
  }

  return (
    <section className="w-full px-3 py-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-6 flex items-center gap-3.5">
        <div className="shrink-0 rounded-xl bg-red-100 p-2.5 text-red-600 sm:p-3 dark:bg-red-950/40 dark:text-red-400">
          <FaExclamationTriangle className="h-5 w-5 sm:h-6 sm:w-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl lg:text-3xl dark:text-white">
            Recipe Reports
          </h1>
          <p className="text-xs text-gray-500 sm:text-sm dark:text-gray-400">
            Review user flags and take necessary actions.
          </p>
        </div>
      </div>

      {/* Reports Card Grid / Empty State */}
      {!reports.length ? (
        <EmptyState />
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {reports.map((report, idx) => (
            <ReportCard
              key={report._id}
              report={report}
              idx={idx}
              actionLoading={actionLoading}
              onDismiss={handleDismiss}
              onRemoveRecipe={handleRemoveRecipe}
            />
          ))}
        </div>
      )}
    </section>
  );
}
