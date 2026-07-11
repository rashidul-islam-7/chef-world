import RecipeDetails from "@/components/RecipeDetails/RecipeDetails";

import { getRecipeDataById } from "@/lib/utils";

// Dynamic Metadata
export async function generateMetadata({ params }) {
  const { id } = await params;

  const recipe = await getRecipeDataById(id);

  return {
    title: `${recipe.recipeName} | Chef World`,
    description: recipe.instructions?.slice(0, 150),
  };
}

// Page Component
const RecipeDetailsPage = async ({ params }) => {
  const { id } = await params;

  const recipe = await getRecipeDataById(id);

  return (
    <div>
      <RecipeDetails recipe={recipe} />
    </div>
  );
};

export default RecipeDetailsPage;
