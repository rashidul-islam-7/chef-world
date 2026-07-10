"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MdOutlineAccessTime } from "react-icons/md";
import { BiDish } from "react-icons/bi";

const FeaturedRecipesCard = ({ featuredRecipesData = [], topRecipes = [] }) => {
  const recipes =
    featuredRecipesData.length > 0 ? featuredRecipesData : topRecipes;

  return (
    <div className=" flex flex-wrap justify-center gap-3 items-center ">
      {recipes.map((recipe, index) => (
        <motion.div
          key={recipe._id}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
          }}
          viewport={{ once: true }}
          className="w-[270px] border border-gray-400 group overflow-hidden rounded-2xl bg-content1 shadow-sm hover:shadow-xl transition-all duration-300"
        >
          {/* Image */}
          <div className="relative overflow-hidden">
            <Image
              src={recipe.recipeImage}
              alt={recipe.recipeName}
              width={500}
              height={250}
              className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <span className="absolute top-4 left-4 rounded-full bg-orange-500 px-3 py-1 text-xs font-medium text-white">
              {featuredRecipesData.length > 0 ? "Featured" : "Top Rated"}
            </span>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="text-lg font-bold line-clamp-1 ">
              {recipe.recipeName}
            </h3>

            <div className="mt-2 flex flex-wrap justify-between items-center text-sm text-default-500">
              <div className="flex items-center gap-1">
                <BiDish className="text-orange-500" />
                {recipe.category}
              </div>

              <div className="flex items-center line-clamp-1 gap-1">
                🍽️ {recipe.cuisineType}
              </div>

              <div className="flex items-center gap-1">
                <MdOutlineAccessTime className="text-orange-500" />
                {recipe.preparationTime} min
              </div>
            </div>

            <Link
              href={`/recipes/${recipe._id}`}
              className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-orange-500 px-5 py-2 font-medium text-white transition-all duration-300 hover:bg-orange-600"
            >
              View Details
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FeaturedRecipesCard;
