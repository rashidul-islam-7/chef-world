import RecipeHero from "@/components/RecipeDetails/RecipeHero";
import RecipeInfo from "@/components/RecipeDetails/RecipeInfo";
import RecipeIngredients from "@/components/RecipeDetails/RecipeIngredients";
import RecipeInstructions from "@/components/RecipeDetails/RecipeInstructions";
import RecipeActions from "@/components/RecipeDetails/RecipeActions";

const RecipeDetails = async ({ recipe }) => {
  return (
    <section className="pb-16">
      <RecipeHero recipe={recipe} />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16">
        <div className="mt-10 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <RecipeIngredients recipe={recipe} />
            <RecipeInstructions recipe={recipe} />
          </div>

          <div>
            <RecipeInfo recipe={recipe} />
            <RecipeActions recipe={recipe} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecipeDetails;
