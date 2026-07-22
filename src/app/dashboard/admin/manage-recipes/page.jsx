import RecipesTable from "@/components/AdminDashboard/ManageRecipes/RecipesTable";
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

  return (
    <section className="p-6">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-orange-100 p-3 text-orange-600">
              <FaUtensils size={24} />
            </div>

            <div>
              <h1 className="text-3xl font-bold">Manage Recipes</h1>

              <p className="mt-1 text-gray-500 dark:text-gray-400">
                View, edit, delete and feature all recipes.
              </p>
            </div>
          </div>
        </div>

        {/* Total Recipe */}
        <div className="rounded-xl border bg-white px-5 py-3 shadow dark:border-gray-700 dark:bg-gray-900">
          <p className="text-sm text-gray-500">Total Recipes</p>

          <h2 className="text-2xl font-bold text-orange-500">
            {recipes.length}
          </h2>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-900">
        <RecipesTable recipes={recipes} featuredIds={featuredIds} />
      </div>
    </section>
  );
};

export default ManageRecipesPage;
