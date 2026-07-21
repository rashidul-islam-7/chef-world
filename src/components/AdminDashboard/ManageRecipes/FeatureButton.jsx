"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { featureRecipeAddDelete } from "@/lib/data";

export default function FeatureRecipeButton({
  recipeId,
  initialFeatured,
  token,
}) {
  const router = useRouter();

  const [isFeatured, setIsFeatured] = useState(initialFeatured);

  // console.log("initialFeatured:", initialFeatured);
  // console.log("isFeatured:", isFeatured);

  const handleFeature = async () => {
    const result = await featureRecipeAddDelete(recipeId, token);

    if (result.success) {
      setIsFeatured(result.featured);
      toast.success(result.message);
      router.refresh();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <button
      onClick={handleFeature}
      className={`px-2 cursor-pointer py-1 rounded flex justify-center items-center text-white ${
        isFeatured
          ? "bg-red-500 hover:bg-red-600"
          : "bg-yellow-500 hover:bg-yellow-600"
      }`}
    >
      <FaStar />

      {isFeatured ? "Remove Feature" : "Feature"}
    </button>
  );
}
