"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, BarChart, Trash2, Eye } from "lucide-react";

export default function FavoriteCard({ recipe, userId, onRemove }) {
  return (
    <div className="group bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-zinc-800 flex flex-col h-full relative">
      {/* image */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-zinc-800">
        <Image
          src={
            recipe.recipeImage || "https://placehold.co/600x400?text=No+Image"
          }
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          alt={recipe.recipeName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* category */}
        <span className="absolute top-3 left-3 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm text-xs font-semibold px-3 py-1 rounded-full text-red-600 shadow-sm">
          {recipe.category}
        </span>

        {/* action btn */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
          <button
            onClick={() => onRemove(recipe._id)}
            className="bg-red-50 dark:bg-zinc-800/95 text-red-500 hover:bg-red-500 hover:text-white p-2 rounded-full shadow-md transition-all duration-200 border border-red-100 dark:border-zinc-700"
            title="Remove from favorites"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mt-1 line-clamp-1">
          {recipe.recipeName}
        </h3>

        {/* meta info */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-3 pt-2 border-t border-gray-100 dark:border-zinc-800">
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-gray-400" />
            <span>{recipe.preparationTime || 0} mins</span>
          </div>

          <div className="flex items-center gap-1.5">
            <BarChart size={14} className="text-gray-400" />
            <span
              className={`font-medium ${
                recipe.difficultyLevel === "Easy"
                  ? "text-green-600"
                  : recipe.difficultyLevel === "Medium"
                    ? "text-yellow-600"
                    : "text-red-600"
              }`}
            >
              {recipe.difficultyLevel}
            </span>
          </div>
        </div>

        {/* author and price */}
        <div className=" mt-2 pt-2 flex items-center justify-between mb-4">
          <span className="text-xs text-gray-400">
            By{" "}
            <span className="font-medium text-gray-600 dark:text-gray-300">
              {recipe.authorName}
            </span>
          </span>
          <span className="text-sm font-bold text-red-500">
            {recipe.price > 0 ? `$${recipe.price}` : "Free"}
          </span>
        </div>

        <Link
          href={`/AllRecipe/${recipe._id}`}
          className="mt-auto w-full flex items-center justify-center gap-2 bg-gray-50 hover:bg-red-50 dark:bg-zinc-800 dark:hover:bg-zinc-800/80 text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 py-2.5 px-4 rounded-xl text-sm font-medium transition-colors duration-200 border border-gray-100 dark:border-zinc-700/60"
        >
          <Eye size={16} />
          View Details
        </Link>

        {/* <button
          onClick={() => onRemove(recipe._id)}
          className="bg-red-50 mt-2 dark:bg-zinc-800/95 text-red-500 hover:bg-red-500 hover:text-white p-2 rounded-xl shadow-md transition-all duration-200 border border-red-100 dark:border-zinc-700"
          title="Remove from favorites"
        >
         <span className="flex justify-center items-center gap-2"> <Trash2 size={16} />Remove</span>
        </button> */}
      </div>
    </div>
  );
}
