"use client";

import { checkUserFavoriteStatus, toggleFavoriteRecipe } from "@/lib/action";
import { useSession } from "@/lib/auth-client";
import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const FavoriteButton = ({ recipe, children, className = "" }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();
  const userId = session?.user?.id;

  const recipeId = recipe?._id || recipe?.id;

  useEffect(() => {
    if (recipe) {
      setFavoritesCount(recipe?.favoriteCount || 0);
    }

    const getFavoriteStatus = async () => {
      if (userId && recipeId) {
        const status = await checkUserFavoriteStatus(recipeId, userId);
        setIsFavorite(status);
      }
    };
    getFavoriteStatus();
  }, [recipeId, userId, recipe]);

  // ২. বাটনে ক্লিকের পর ফেভারিট টগল হ্যান্ডলার
  const handleFavorite = async (e) => {
    e.preventDefault(); // প্যারেন্ট এঙ্করের বা ডিফল্ট বিহেভিয়ার বন্ধ করার জন্য

    if (!userId) {
      alert("Please login to add this recipe to your favorites!");
      return;
    }

    if (loading) return;

    setLoading(true);

    // [Optimistic Update] ব্যাকএন্ডের রেসপন্সের জন্য অপেক্ষা না করে সাথে সাথে ইউজার ইন্টারফেসে আপডেট করা
    const previousFavorite = isFavorite;
    setIsFavorite(!previousFavorite);
    setFavoritesCount((prev) => (previousFavorite ? prev - 1 : prev + 1));

    const result = await toggleFavoriteRecipe(recipeId, userId);

    if (result && result.success) {
      setIsFavorite(result.isFavorite); // ব্যাকএন্ডের আসল স্টেট সিঙ্ক করা
    } else {
      // রিকোয়েস্ট ফেইল করলে আগের সঠিক অবস্থায় ফিরিয়ে নিয়ে যাওয়া
      setIsFavorite(previousFavorite);
      setFavoritesCount((prev) => (previousFavorite ? prev + 1 : prev - 1));
      alert("Failed to update favorite status. Try again!");
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleFavorite}
      disabled={loading}
      className={`flex items-center gap-1 shadow rounded-full px-3 dark:px-0 py-0.5 cursor-pointer disabled:opacity-60 transition duration-200 ${className}`}
    >
      <span className="mb-0.5">
        {isFavorite ? (
          <FaHeart size={16} className="text-red-500" />
        ) : (
          <FaRegHeart size={16} className="text-red-600" />
        )}
      </span>

      {children}

      {/* আপনার ডাটাবেজের ফেভারিট কাউন্ট যা টগল করার সাথে সাথে রিয়েল-টাইমে বাড়বে/কমবে */}
      <span className="dark:text-gray-100 text-sm font-medium">
        {favoritesCount}
      </span>
    </button>
  );
};

export default FavoriteButton;
