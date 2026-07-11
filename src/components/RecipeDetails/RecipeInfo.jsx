import { AiFillLike } from "react-icons/ai";
import { FaClock, FaUser } from "react-icons/fa";

const RecipeInfo = ({ recipe }) => {
  return (
    <div className="rounded-2xl border border-gray-300 p-6">
      <h1 className="text-3xl font-bold">{recipe?.recipeName}</h1>

      <div className="mt-4 flex items-center gap-2 text-gray-500">
        <FaUser />
        <span>{recipe?.authorName}</span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-gray-400/20 p-4">
          <p className="text-sm">Category</p>
          <h4 className="font-semibold">{recipe?.category}</h4>
        </div>

        <div className="rounded-xl bg-gray-400/20 p-4">
          <p className="text-sm">Cuisine</p>
          <h4 className="font-semibold">{recipe?.cuisineType}</h4>
        </div>

        <div className="rounded-xl bg-gray-400/20 p-4">
          <p className="text-sm">Difficulty</p>
          <h4 className="font-semibold">{recipe?.difficultyLevel}</h4>
        </div>

        <div className="rounded-xl bg-gray-400/20 p-4">
          <div className="flex items-center gap-2">
            <FaClock />
            <h4 className="font-semibold">{recipe?.preparationTime} min</h4>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-2 text-red-500">
        <div className="flex justify-center items-center gap-1">
          <AiFillLike size={18} className="mb-0.5" />
          <span className="font-semibold">{recipe?.likesCount} Likes</span>
        </div>
        <div>$-{recipe?.price || "5"}</div>
      </div>
    </div>
  );
};

export default RecipeInfo;
