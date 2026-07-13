"use client";

import Image from "next/image";
import Link from "next/link";
import { AiFillLike } from "react-icons/ai";
import { FaPlusCircle } from "react-icons/fa";
import DeleteRecipe from "./DeleteRecipe";
import EditRecipe from "./EditRecipe";

const MyRecipesTable = ({ recipes = [] }) => {
  return (
    <>
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold dark:text-gray-100">My Recipes</h1>

          <p className="mt-1 text-gray-500 dark:text-gray-300">
            Manage all your recipes in one place.
          </p>
        </div>

        <Link
          href="/dashboard/add-recipe"
          className="flex items-center gap-2 rounded-sm bg-orange-500 px-5 py-2 text-white transition hover:bg-orange-600"
        >
          <FaPlusCircle />
          Add Recipe
        </Link>
      </div>

      {/* Empty UI */}
      {recipes.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-dashed">
          <h2 className="text-2xl font-bold">No Recipes Found</h2>

          <p className="mt-2 text-gray-500 dark:text-gray-300">
            Create your first recipe.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-200  shadow-sm">
          {/* Desktop Table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="table">
              <thead className="bg-gray-500 text-white">
                <tr>
                  <th>Recipe</th>
                  <th>Category</th>
                  <th>Likes</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {recipes.map((recipe) => (
                  <tr className="dark:text-gray-200" key={recipe._id}>
                    <td>
                      <div className="flex items-center gap-4">
                        <Image
                          src={recipe.recipeImage}
                          alt={recipe.recipeName}
                          width={56}
                          height={56}
                          className="h-14 w-14 rounded-xl object-cover"
                        />

                        <div>
                          <h3 className="font-semibold ">
                            {recipe.recipeName}
                          </h3>
                        </div>
                      </div>
                    </td>

                    <td className="">{recipe.category}</td>

                    <td>
                      <div className="flex items-center gap-2 text-blue-500">
                        <AiFillLike />
                        {recipe.likesCount}
                      </div>
                    </td>

                    <td>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          recipe.status === "approved"
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {recipe.status}
                      </span>
                    </td>

                    <td>
                      <div className="flex justify-center gap-2">
                        <EditRecipe recipeId={recipe._id} />
                        <DeleteRecipe recipeId={recipe._id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="grid gap-4 p-4 md:hidden">
            {recipes.map((recipe) => (
              <div
                key={recipe._id}
                className="rounded-xl border border-gray-200 bg-white p-4"
              >
                <div className="flex gap-3">
                  <Image
                    src={recipe.recipeImage}
                    alt={recipe.recipeName}
                    width={80}
                    height={80}
                    className="h-20 w-20 rounded-lg object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold">{recipe.recipeName}</h3>

                    <p className="text-sm text-gray-500">
                      Category: {recipe.category}
                    </p>

                    <div className="flex items-center gap-3">
                      <div className="mt-2 flex items-center gap-2">
                        <AiFillLike />
                        <span>{recipe.likesCount}</span>
                      </div>

                      <span
                        className={`mt-2 inline-block rounded-full px-3 py-1 text-xs ${
                          recipe.status === "approved"
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {recipe.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <EditRecipe recipeId={recipe._id} />
                  <DeleteRecipe recipeId={recipe._id} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MyRecipesTable;
