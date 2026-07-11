"use client";

import { FaShoppingCart, FaFlag } from "react-icons/fa";
import LikeButton from "../BrowseRecipe/LikeButton";
import FavoriteButton from "../BrowseRecipe/FavoriteButton";

const RecipeActions = ({ recipe }) => {
  return (
    <div className="mt-6 space-y-3">
      <LikeButton
        recipe={recipe}
        className={"btn w-full bg-blue-400 hover:bg-blue-500 text-white"}
      >
        {" "}
        Like Recipe
      </LikeButton>

      <FavoriteButton
        recipe={recipe}
        className={"btn w-full bg-yellow-500 hover:bg-yellow-600 text-white "}
      >
        {" "}
        Add Favorite
      </FavoriteButton>

      <button className="btn w-full bg-green-600 rounded-full hover:bg-green-700 text-white">
        <FaShoppingCart />
        Purchase Recipe
      </button>

      <button className="btn w-full btn-outline rounded-full bg-red-500 hover:bg-red-700 text-white">
        <FaFlag />
        Report Recipe
      </button>
    </div>
  );
};

export default RecipeActions;
