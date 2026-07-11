"use client";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const FavoriteButton = ({ recipe, children, className = "" }) => {
  const handleFavorite = async () => {};

  const favorite = false;

  return (
    <button
      onClick={handleFavorite}
      className={`flex items-center gap-1 shadow rounded-full px-3 dark:px-0 py-0.5 cursor-pointer ${className} `}
    >
      <span className="mb-0.5">
        {favorite ? (
          <FaHeart size={16} className="text-red-500" />
        ) : (
          <FaRegHeart size={16} className="text-red-600" />
        )}
      </span>

      {children}

      <span className="dark:text-gray-100 text-sm">123</span>
    </button>
  );
};

export default FavoriteButton;
