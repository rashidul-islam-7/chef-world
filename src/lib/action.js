const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const toggleLikeRecipe = async (recipeId, userId) => {
  try {
    const res = await fetch(`${API_URL}/recipes/${recipeId}/like`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    if (!res.ok) {
      throw new Error("Failed to toggle like");
    }

    return await res.json();
  } catch (error) {
    console.error("Error in toggleLikeRecipe:", error);
    return null;
  }
};

export const checkUserLikedStatus = async (recipeId, userId) => {
  try {
    const res = await fetch(
      `${API_URL}/recipes/${recipeId}/like-status?userId=${userId}`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) return false;
    const data = await res.json();
    return data.isLiked;
  } catch (error) {
    console.error("Error in checkUserLikedStatus:", error);
    return false;
  }
};
