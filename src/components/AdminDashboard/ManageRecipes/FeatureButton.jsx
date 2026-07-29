"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toggleFeaturedRecipe } from "@/lib/action";
import { authClient } from "@/lib/auth-client";

export default function FeatureRecipeButton({
  recipeId,
  initialFeatured = false,
}) {
  const router = useRouter();

  const [isFeatured, setIsFeatured] = useState(initialFeatured);
  const [loading, setLoading] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const userRole = session?.user?.role;

  useEffect(() => {
    setIsFeatured(initialFeatured);
  }, [initialFeatured]);

  useEffect(() => {
    if (!isPending) {
      if (!session || userRole !== "admin") {
        toast.error("You are not authorized! Admin access required.", {
          toastId: "unauthorized-admin-toast",
        });

        router.push("/");
      }
    }
  }, [isPending, session, userRole, router]);

  const handleFeature = async () => {
    if (userRole !== "admin") {
      toast.error("Only admins can perform this action!");
      return;
    }

    try {
      setLoading(true);
      const result = await toggleFeaturedRecipe(recipeId);

      if (result?.success) {
        setIsFeatured(result.featured);
        toast.success(result.message || "Updated successfully!");
        router.refresh();
      } else {
        toast.error(result?.message || "Failed to update feature status!");
      }
    } catch (error) {
      console.error("Feature Recipe Error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (isPending || userRole !== "admin") {
    return null;
  }

  return (
    <button
      onClick={handleFeature}
      disabled={loading}
      className={`px-2 py-1 rounded text-sm font-medium flex items-center justify-center gap-1 transition-all cursor-pointer text-white disabled:opacity-50 disabled:cursor-not-allowed ${
        isFeatured
          ? "bg-red-500 hover:bg-red-600 active:scale-95"
          : "bg-yellow-500 hover:bg-yellow-600 active:scale-95"
      }`}
    >
      <FaStar className={loading ? "animate-spin" : ""} />
      {loading ? "Processing..." : isFeatured ? "Unfeatured" : "Feature"}
    </button>
  );
}
