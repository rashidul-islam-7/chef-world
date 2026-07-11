export const metadata = {
  title: "All Recipe | CookWorld",
};

import BrowseRecipeClient from "@/components/RecipeDetails/BrowseRecipes";
import { getAllRecipe } from "@/lib/getData";

export default async function BrowseRecipesPage() {
  const recipes = await getAllRecipe();


  return (
    <section className=" bg-gray-100/50 dark:bg-gray-900">
      <div className="py-10 md:py-16 mt-15 max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 ">
        {/* Header */}
        <div className="text-center md:mb-8">
          <span className="inline-block rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-600">
            Explore Recipes
          </span>

          <h1 className="my-4 text-3xl md:text-5xl font-bold">
            Browse All Recipes
          </h1>

          <p className=" text-gray-500 max-w-2xl mx-auto">
            Discover delicious recipes shared by food lovers from around the
            world.
          </p>
        </div>

        <BrowseRecipeClient recipes={recipes} />
      </div>
    </section>
  );
}
