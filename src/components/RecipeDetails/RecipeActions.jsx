"use client";

import { FaShoppingCart, FaFlag } from "react-icons/fa";
import LikeButton from "../BrowseRecipe/LikeButton";
import FavoriteButton from "../BrowseRecipe/FavoriteButton";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useSession } from "@/lib/auth-client";

const RecipeActions = ({ recipe }) => {
  const { data } = useSession();
  const user = data?.user;
  const router = useRouter();

  const handlePurchase = (e) => {
    if (!user) {
      e.preventDefault();
      toast.error("Please login first");
      router.push("/signin");
    }
  };

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

      <form onSubmit={handlePurchase} action="/api/payment" method="POST">
        <input type="hidden" name="recipeName" value={recipe?.recipeName} />
        <input type="hidden" name="price" value={recipe?.price} />
        <input type="hidden" name="recipeId" value={recipe?._id} />
        <input type="hidden" name="authorName" value={recipe?.authorName} />
        <input type="hidden" name="recipeImage" value={recipe?.recipeImage} />
        <button className="btn w-full bg-green-600 rounded-full hover:bg-green-700 text-white">
          <FaShoppingCart />
          Purchase Recipe
        </button>
      </form>
      <button className="btn w-full btn-outline rounded-full bg-red-500 hover:bg-red-700 text-white">
        <FaFlag />
        Report Recipe
      </button>
    </div>
  );
};

export default RecipeActions;
