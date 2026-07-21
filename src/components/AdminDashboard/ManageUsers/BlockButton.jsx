"use client";

import { blockUser, unblockUser } from "@/lib/data";
import { useState } from "react";
import { LuLock } from "react-icons/lu";

const BlockButton = ({ user }) => {
  const [loading, setLoading] = useState(false);

  const isAdmin = user.role === "admin";

  async function handleToggleBlock(id) {
    if (isAdmin) return;

    setLoading(true);
    try {
      if (user.isBlocked) {
        await unblockUser(id);
      } else {
        await blockUser(id);
      }

      location.reload();
    } catch (error) {
      console.error("Error updating user status:", error);
      setLoading(false);
    }
  }

  if (isAdmin) {
    return (
      <button
        disabled
        className="inline-flex items-center gap-1 bg-gray-100 text-gray-400 px-4 py-1 rounded-lg font-semibold cursor-not-allowed"
        title="Administrators cannot be blocked"
      >
        <LuLock size={14} />
        Protected
      </button>
    );
  }

  return (
    <button
      onClick={() => handleToggleBlock(user._id)}
      disabled={loading}
      className={`cursor-pointer px-4 py-1 rounded-lg font-semibold transition ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      } ${
        user.isBlocked
          ? "bg-green-100 text-green-700 hover:bg-green-200"
          : "bg-red-100 text-red-700 hover:bg-red-200"
      }`}
    >
      {loading ? "Loading..." : user.isBlocked ? "Unblock" : "Block"}
    </button>
  );
};

export default BlockButton;
