import { auth } from "@/lib/auth";
import Link from "next/link";
import Image from "next/image";
import { getMyPurchasedRecipes } from "@/lib/getData";
import { headers } from "next/headers";

export default async function MyPurchasedRecipesPage() {
  const userSession = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = userSession?.user?.id;
  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-800">
        <p className="text-gray-500 dark:text-white">
          Please login to view your purchased recipes.
        </p>
      </div>
    );
  }

  let recipes = [];
  try {
    recipes = await getMyPurchasedRecipes(userId);
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 dark:bg-gray-800 dark:text-white">
      <h1 className="text-3xl font-bold dark:text-white text-gray-900 mb-2">
        My Purchased Recipes
      </h1>
      <p className="text-gray-500 mb-8 dark:text-gray-300">
        All the premium recipes you have unlocked so far.
      </p>

      {recipes.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500 mb-4 text-lg">
            You haven't purchased any recipes yet!
          </p>
          <Link
            href="/AllRecipe"
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Explore Recipes
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-38 w-full bg-gray-100">
                  <Image
                    src={recipe.recipeImage || "/placeholder-recipe.jpg"}
                    alt={recipe.recipeName}
                    fill
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* recipe content  */}
                <div className="p-3">
                  {/* <span className="font-semibold uppercase tracking-wider text-green-600 bg-green-50 px-2 text-[10px] rounded-md">
                    Unlocked
                  </span> */}
                  <h3 className="text-xl font-bold text-gray-900 mt-1 line-clamp-1">
                    {recipe.recipeName}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    By {recipe.authorName || "Unknown"}
                  </p>
                </div>
              </div>

              {/*  */}
              <div className="px-3 -mt-2 border-t border-gray-50 bg-gray-50/50">
                <div className="text-xs bold text-gray-500  font-mono">
                  <span className="flex items-center gap-1">
                    Price: ${recipe.price}
                  </span>
                  {/* <span
                    className="truncate max-w-[120px]"
                    title={recipe.transactionId}
                  >
                    ID: {recipe.transactionId}
                  </span> */}
                </div>
                <div className="py-3">
                  <Link
                   href={`/AllRecipe/${recipe.recipeId}`}
                    className="w-full block text-center bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold py-2 px-4 rounded-xl transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
