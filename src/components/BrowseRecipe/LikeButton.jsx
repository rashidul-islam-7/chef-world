"use client";

import { useState, useEffect } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { toggleLikeRecipe, checkUserLikedStatus } from "@/lib/action.js";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

const LikeButton = ({ recipe, className = "" }) => {
  const router = useRouter();
  const recipeId = recipe?._id;

  const { data: session } = useSession();
  const currentUserId = session?.user?.id;

  const [likesCount, setLikesCount] = useState(recipe?.likesCount || 0);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLiking, setIsLiking] = useState(false);

  useEffect(() => {
    if (currentUserId && recipeId) {
      checkUserLikedStatus(recipeId, currentUserId).then((status) => {
        setLiked(status);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [recipeId, currentUserId]);

  const handleLike = async () => {
    if (!currentUserId) {
      alert("Please login to like this recipe!");
      return;
    }

    if (isLiking) return;
    setIsLiking(true);

    const prevLiked = liked;
    const prevCount = likesCount;

    setLiked(!prevLiked);
    setLikesCount(prevLiked ? prevCount - 1 : prevCount + 1);

    const result = await toggleLikeRecipe(recipeId, currentUserId);

    if (result && result.success) {
      setLikesCount(result.likesCount);
      setLiked(result.isLiked);
      router.refresh();
    } else {
      setLiked(prevLiked);
      setLikesCount(prevCount);
      alert("Failed to update like. Please try again.");
    }
    setIsLiking(false);
  };

  if (loading) {
    return (
      <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-full" />
    );
  }

  return (
    <button
      onClick={handleLike}
      disabled={isLiking}
      className={`flex items-center gap-2 shadow rounded-full px-3 py-1 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 ${className}`}
    >
      <span className="mb-0.5">
        {liked ? (
          <AiFillLike size={18} className="text-blue-600 dark:text-blue-400" />
        ) : (
          <AiOutlineLike size={18} className="text-blue-500" />
        )}
      </span>
      <span className="dark:text-gray-100 text-sm font-semibold">
        {likesCount} Likes
      </span>
    </button>
  );
};

export default LikeButton;
