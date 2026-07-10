import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import FeaturedRecipesCard from "./FeaturedRecipesCard";

const recipesData = [];

const FeaturedRecipes = async () => {
  const featuredRecipesData = [];
  const topRecipes = recipesData
    .sort((a, b) => b.likeCount - a.likeCount)
    .slice(0, 4);

  return (
    <section className=" bg-gray-100/50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 py-15 md:py-20">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-14 ">
          <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-600">
            <FaStar />
            Featured Recipes
          </span>

          <h2 className="mt-3 text-4xl font-bold">
            Hand Picked Recipes For You
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-default-500">
            Discover our most loved and featured recipes curated by food
            enthusiasts and professional chefs.
          </p>
        </div>

        {/* Cards */}

        <FeaturedRecipesCard
          featuredRecipesData={featuredRecipesData}
          topRecipes={topRecipes}
        />

        {/* Button */}
        <div className="mt-14 text-center">
          <Link
            href="/recipes"
            className="inline-flex rounded-xl border border-orange-500 px-8 py-3 font-medium text-orange-500 transition-all duration-300 hover:bg-orange-500 hover:text-white"
          >
            View All Recipes
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRecipes;
