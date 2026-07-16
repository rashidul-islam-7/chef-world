"use client";

import { useState } from "react";
import Link from "next/link";
import FavoriteCard from "./FavoriteCard";
import { removeFavoriteFromDB } from "@/lib/action";
import { toast } from "react-toastify";

const  FavoriteGrid = ({ initialFavorites, userId })=> {
  const [favorites, setFavorites] = useState(initialFavorites);

  const handleRemoveFavorite = async (recipeId) => {
    const originalFavorites = [...favorites];

    try {
      setFavorites((prev) => prev.filter((item) => item._id !== recipeId));
      const result = await removeFavoriteFromDB(recipeId, userId);

      if (!result || !result.success) {
        throw new Error(result?.message || "Failed to remove from database");
      }

      toast.success("Permanently deleted from database successfully!");
    } catch (error) {
      console.error("Failed to remove favorite:", error);
      toast.error("Could not remove item." || error);
      setFavorites(originalFavorites);
    }
  };

  if (favorites.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl bg-gray-50/50 dark:bg-zinc-900/30">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No favorite recipes found yet.
        </p>
        <Link
          href="/recipes"
          className="mt-4 inline-block bg-red-500 text-white px-6 py-2.5 rounded-full font-medium hover:bg-red-600 transition duration-200 shadow-md text-sm"
        >
          Explore Recipes
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {favorites.map((recipe) => (
        <FavoriteCard
          key={recipe._id}
          recipe={recipe}
          userId={userId}
          onRemove={handleRemoveFavorite}
        />
      ))}
    </div>
  );
}

export default FavoriteGrid;