"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { FaFlag } from "react-icons/fa";
import { submitRecipeReport } from "@/lib/action";

export default function ReportModal({ recipeId, user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState("Spam");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => {
    setIsOpen(false);
    setDetails("");
    setReason("Spam");
  };

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    setLoading(true);

    const reportData = {
      recipeId,
      userId: user?.uid || user?.id || "",
      userName: user?.name || "Anonymous",
      userEmail: user?.email || "N/A",
      reason,
      details,
    };

    try {
      const res = await submitRecipeReport(reportData);

      if (res?.success) {
        toast.success(res.message || "Report submitted successfully!");
        handleCloseModal();
      } else {
        toast.error(res?.message || "Failed to submit report.");
      }
    } catch (error) {
      console.error("Report Error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 🔴 Trigger Button (আপনার দেওয়া বাটনটি) */}
      <button
        onClick={handleOpenModal}
        type="button"
        className="btn w-full btn-outline rounded-full bg-red-500 hover:bg-red-700 text-white border-none flex items-center justify-center gap-2"
      >
        <FaFlag />
        Report Recipe
      </button>

      {/* 🪟 Report Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-900 dark:text-white border dark:border-gray-800">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b pb-3 dark:border-gray-800">
              <h3 className="text-xl font-bold text-red-600 flex items-center gap-2">
                <FaFlag /> Report Recipe
              </h3>
              <button
                onClick={handleCloseModal}
                className="btn btn-sm btn-circle btn-ghost text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800"
              >
                ✕
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSubmitReport} className="mt-4 space-y-4">
              {/* Select Reason */}
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">
                  Select Reason <span className="text-red-500">*</span>
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="select select-bordered w-full rounded-xl dark:bg-gray-800 dark:border-gray-700 focus:outline-none"
                  required
                >
                  <option value="Spam">Spam</option>
                  <option value="Offensive Content">Offensive Content</option>
                  <option value="Copyright Issue">Copyright Issue</option>
                </select>
              </div>

              {/* Additional Details Textarea */}
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">
                  Additional Details (Optional)
                </label>
                <textarea
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Explain why you are reporting this recipe..."
                  className="textarea textarea-bordered w-full rounded-xl dark:bg-gray-800 dark:border-gray-700 focus:outline-none"
                />
              </div>

              {/* Modal Actions/Buttons */}
              <div className="flex justify-end gap-3 pt-3 border-t dark:border-gray-800">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="btn btn-ghost rounded-full"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn bg-red-600 hover:bg-red-700 text-white rounded-full border-none disabled:opacity-50"
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    "Submit Report"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
