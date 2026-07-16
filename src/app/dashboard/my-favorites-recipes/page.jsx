import FavoriteGrid from "@/components/DashboardPage/My-Favorites/FavoriteGrid";
import { getUserFavoriteRecipes } from "@/lib/action";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const MyFavoritesPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user?.id;

  if (!userId) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500">Please log in to see your favorites.</p>
      </div>
    );
  }

  let initialFavorites = [];
  try {
    const data = await getUserFavoriteRecipes(userId);
    initialFavorites = Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching favorites on server:", error);
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          My Favorite Recipes
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Manage your saved recipe collection.
        </p>
      </div>
      <FavoriteGrid initialFavorites={initialFavorites} userId={userId} />
    </div>
  );
};
export default MyFavoritesPage;
