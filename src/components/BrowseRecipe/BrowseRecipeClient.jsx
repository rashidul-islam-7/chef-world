"use client";

import { useMemo, useState } from "react";
import FilterRecipe from "./FilterRecipe";
import RecipeCard from "./RecipeCard";
import SearchRecipe from "./SearchRecipe";
import { FaSearchMinus } from "react-icons/fa";

const BrowseRecipeClient = ({ recipes }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredRecipes = useMemo(() => {
    let filtered = recipes;

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (recipe) => recipe.category === selectedCategory,
      );
    }
    if (searchText) {
      filtered = filtered.filter((recipe) =>
        recipe.recipeName.toLowerCase().includes(searchText.toLowerCase()),
      );
    }
    return filtered;
  }, [recipes, searchText, selectedCategory]);

  return (
    <>
      <SearchRecipe searchText={searchText} setSearchText={setSearchText} />

      <FilterRecipe
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {filteredRecipes?.length > 0 ? (
        <>
          {/* Results Count */}
          <div className="mb-6">
            <p className="text-base text-gray-500">
              Found{" "}
              <span className="font-semibold text-orange-500">
                {filteredRecipes?.length}
              </span>{" "}
              recipes
            </p>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-24">
          {/* Icon */}
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
            <FaSearchMinus className="text-3xl text-orange-500" />
          </div>

          {/* Title */}
          <h2 className="mt-6 text-3xl md:text-4xl font-bold">
            No Recipes Found
          </h2>

          {/* Description */}
          <p className="mt-4 max-w-lg text-center text-gray-500">
            We could not find any recipes matching your search or selected
            category. Try another keyword or reset your filters.
          </p>

          {/* Button */}

          <button
            onClick={() => {
              setSearchText("");
              setSelectedCategory("All");
            }}
            className="mt-6 rounded-xl bg-orange-500 px-6 py-2 font-medium text-white transition-all duration-300 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/20 cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </>
  );
};

export default BrowseRecipeClient;
