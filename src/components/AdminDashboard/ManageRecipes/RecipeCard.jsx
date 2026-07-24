import Image from "next/image";
import EditRecipeButton from "./EditButton";
import FeatureRecipeButton from "./FeatureButton";
import DeleteRecipe from "@/components/MyRecipes/DeleteRecipe";

export default function RecipeCard({ recipe, index, isFeatured }) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-col gap-3">
        {/* Header: Serial & Price */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-2 dark:border-gray-800">
          <span className="text-xs font-bold text-gray-400 dark:text-gray-500">
            #{index + 1}
          </span>
          <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-600 dark:bg-green-950/40 dark:text-green-400">
            ${recipe.price}
          </span>
        </div>

        {/* Recipe Main Details */}
        <div className="flex items-center gap-3">
          {recipe?.recipeImage ? (
            <Image
              src={recipe.recipeImage}
              alt={recipe.recipeName || "Recipe"}
              width={64}
              height={64}
              className="h-16 w-16 shrink-0 rounded-xl border border-gray-100 object-cover shadow-sm dark:border-gray-800"
            />
          ) : (
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-[10px] font-medium text-gray-400 dark:bg-gray-800">
              No Image
            </div>
          )}

          <div className="min-w-0 flex-1">
            <h3
              className="truncate text-base font-bold text-gray-800 dark:text-gray-100"
              title={recipe.recipeName}
            >
              {recipe.recipeName}
            </h3>
            {recipe.cuisineType && (
              <p className="mt-0.5 truncate text-xs font-medium text-orange-500">
                {recipe.cuisineType}
              </p>
            )}
          </div>
        </div>

        {/* Author & Category Meta Info */}
        <div className="space-y-1.5 rounded-xl border border-gray-100 bg-gray-50/80 p-3 text-xs dark:border-gray-800/80 dark:bg-gray-800/40">
          <div className="flex items-center justify-between gap-2">
            <span className="text-gray-400">Author:</span>
            <span className="truncate font-semibold text-gray-700 dark:text-gray-300">
              {recipe.authorName || "Unknown"}
            </span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="text-gray-400">Category:</span>
            <span className="truncate font-medium text-gray-700 dark:text-gray-300">
              {recipe.category || "N/A"}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons Bar */}
      <div className="mt-3 flex items-center justify-between gap-2 border-t border-gray-100 pt-3 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <EditRecipeButton recipe={recipe} />
          <DeleteRecipe recipeId={recipe._id} />
        </div>

        <FeatureRecipeButton
          recipeId={recipe._id}
          initialFeatured={isFeatured}
        />
      </div>
    </div>
  );
}
