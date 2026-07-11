"use client";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

const LikeButton = ({ recipe, children, className = "" }) => {
  const handleLike = async () => {};
  const liked = false;
  return (
    <button
      onClick={handleLike}
      className={`flex items-center gap-2 shadow rounded-full px-3 dark:px-0 py-0.5 cursor-pointer ${className}`}
    >
      <span className="mb-0.5">
        {liked ? (
          <AiFillLike size={18} className="text-blue-600" />
        ) : (
          <AiOutlineLike size={18} className="text-blue-500" />
        )}
      </span>
      {children}
      <span className="dark:text-gray-100 text-sm" >321</span>
    </button>
  );
};

export default LikeButton;
