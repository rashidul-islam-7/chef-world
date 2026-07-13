export const metadata = {
  title: "Add Recipe | ChefWorld",
};

import RecipeForm from "@/components/DashboardPage/AddRecipe/RecipeForm";

export default function AddRecipePage() {
  return (
    <section className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold  dark:text-gray-100">
          Add New Recipe
        </h1>

        <p className="mt-1 text-gray-500  dark:text-gray-300">
          Share your favorite recipe with the CookWorld community.
        </p>
      </div>

      <RecipeForm />
    </section>
  );
}
