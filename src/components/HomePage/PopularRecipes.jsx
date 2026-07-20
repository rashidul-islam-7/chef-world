import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import PopularRecipesSlide from "./PopularRecipesSlide";
import { getAllRecipe } from "@/lib/getData";

const PopularRecipes = async () => {
  const recipesData = await getAllRecipe();
  console.log(recipesData)

  const topRecipes = recipesData
    .sort((a, b) => b.likesCount - a.likesCount)
    .slice(0, 8);

  return (
    <section className="pt-20 bg-linear-to-b from-yellow-50/50 to-white dark:from-gray-900 dark:to-gray-700">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium">
              Popular Recipes
            </span>

            <h2 className="mt-4 text-3xl md:text-4xl font-bold">
              Most Loved Recipes
            </h2>

            <p className="mt-3 text-gray-500 max-w-xl">
              Discover recipes that have received the highest number of likes
              from our food-loving community.
            </p>
          </div>

          {/* Custom Navigation */}
          <div className="flex items-center gap-3">
            <button className="popular-prev w-12 h-12 rounded-full border border-orange-500 text-orange-500 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300 cursor-pointer">
              <FaArrowLeft />
            </button>

            <button
              className="popular-next w-12 h-12 rounded-full border 
           border-orange-500 text-orange-500 flex items-center hover:text-white justify-center hover:bg-orange-500  transition-all duration-300 cursor-pointer"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>

        {/* PopularRecipesSlide */}
        <PopularRecipesSlide recipes={topRecipes} />
      </div>
    </section>
  );
};

export default PopularRecipes;
