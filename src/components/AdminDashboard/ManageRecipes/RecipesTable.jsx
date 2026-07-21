import Image from "next/image";
import RecipeRow from "./RecipeRow";
import EditRecipeButton from "./EditButton";
import DeleteRecipeButton from "./DeleteButton";
import FeatureRecipeButton from "./FeatureButton";

const RecipesTable = async ({ recipes }) => {
  if (!recipes?.length) {
    return (
      <div className="rounded-xl border border-dashed py-20 text-center text-gray-500">
        No recipes found.
      </div>
    );
  }

  return (
    <>
      {/* ================= Desktop Table ================= */}
      <div className="hidden w-full overflow-x-auto rounded-xl border text-white shadow-sm dark:border-gray-700 dark:bg-gray-900 md:block">
        <table className="table w-full">
          <thead className="bg-gray-400 text-white">
            <tr>
              <th>#</th>
              <th>Recipe</th>
              <th>Author</th>
              <th>Category</th>
              <th>Price</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {recipes.map((recipe, index) => (
              <RecipeRow key={recipe._id} recipe={recipe} index={index} />
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= Mobile Cards ================= */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {recipes.map((recipe, index) => (
          <div
            key={recipe._id}
            className="rounded-2xl border p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900"
          >
            {/* Top Section */}
            <div className="flex items-start gap-3">
              <Image
                src={recipe.recipeImage}
                alt={recipe.recipeName}
                width={80}
                height={80}
                className="h-20 w-20 flex-shrink-0 rounded-xl object-cover"
              />

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="truncate text-base font-bold">
                    {recipe.recipeName}
                  </h3>

                  <span className="text-xs text-gray-400">#{index + 1}</span>
                </div>

                <p className="mt-1 text-sm text-gray-500">
                  {recipe.cuisineType}
                </p>

                <div className="mt-3 space-y-1 text-sm">
                  <p>
                    <span className="font-medium">Author:</span>{" "}
                    <span className="break-words">{recipe.authorName}</span>
                  </p>

                  <p>
                    <span className="font-medium">Category:</span>{" "}
                    {recipe.category}
                  </p>

                  <p className="font-semibold text-green-600">
                    ${recipe.price}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-2 flex flex-wrap justify-between items-center gap-2 border-t pt-2">
              <EditRecipeButton recipe={recipe} />

              <DeleteRecipeButton recipeId={recipe._id} />

              <FeatureRecipeButton
                recipeId={recipe._id}
                featured={recipe.featured}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RecipesTable;
