import RecipeCard from "@/components/AdminDashboard/ManageRecipes/RecipeCard";
import { getAllRecipe, getFeaturedRecipes } from "@/lib/getData";
import { FaUtensils } from "react-icons/fa";

export const metadata = {
  title: "Manage Recipe | ChefWorld",
};

const ManageRecipesPage = async () => {
  const recipes = await getAllRecipe();
  const featuredRecipes = await getFeaturedRecipes();

  const featuredIds =
    featuredRecipes?.map((item) => String(item.recipeId || item._id || item)) ||
    [];

  const formattedFeaturedIds = featuredIds.map((id) => String(id));

  return (
    <section className="w-full px-3 py-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3.5">
          <div className="shrink-0 rounded-xl bg-orange-100 p-2.5 text-orange-600 sm:p-3 dark:bg-orange-950/40 dark:text-orange-400">
            <FaUtensils className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl lg:text-3xl dark:text-white">
              Manage Recipes
            </h1>
            <p className="text-xs text-gray-500 sm:text-sm dark:text-gray-400">
              View, edit, delete and feature all recipes.
            </p>
          </div>
        </div>

        {/* Total Recipes Badge */}
        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-2.5 shadow-sm sm:justify-start sm:gap-4 dark:border-gray-800 dark:bg-gray-900">
          <p className="text-xs font-medium text-gray-500 sm:text-sm dark:text-gray-400">
            Total Recipes
          </p>
          <h2 className="text-xl font-bold text-orange-500 sm:text-2xl">
            {recipes?.length || 0}
          </h2>
        </div>
      </div>

      {/* Cards Grid */}
      {!recipes?.length ? (
        <div className="rounded-2xl border border-dashed border-gray-300 py-16 text-center text-gray-500 dark:border-gray-800 dark:text-gray-400">
          No recipes found.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe, index) => {
            const isFeatured = formattedFeaturedIds.includes(
              String(recipe._id),
            );

            return (
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
                index={index}
                isFeatured={isFeatured}
              />
            );
          })}
        </div>
      )}
    </section>
  );
};

export default ManageRecipesPage;
