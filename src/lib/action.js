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

export const toggleFavoriteRecipe = async (recipeId, userId) => {
  try {
    const res = await fetch(`${API_URL}/favorites`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipeId, userId }),
    });

    if (!res.ok) {
      throw new Error("Failed to toggle favorite");
    }

    return await res.json();
  } catch (error) {
    console.error("Error in toggleFavoriteRecipe:", error);
    return null;
  }
};

export const checkUserFavoriteStatus = async (recipeId, userId) => {
  try {
    const res = await fetch(
      `${API_URL}/favorites?userId=${userId}&recipeId=${recipeId}`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) return false;
    const data = await res.json();
    return data.isFavorite;
  } catch (error) {
    console.error("Error in checkUserFavoriteStatus:", error);
    return false;
  }
};

export const getUserFavoriteRecipes = async (userId) => {
  try {
    if (!userId) return [];
    const res = await fetch(`${API_URL}/favorites?userId=${userId}`, {
      cache: "no-store",
    });

    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Error in getUserFavoriteRecipes:", error);
    return [];
  }
};

export const removeFavoriteFromDB = async (recipeId, userId) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/remove-favorite/${recipeId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      },
    );

    if (!res.ok) {
      throw new Error("Failed to delete favorite from database");
    }

    return await res.json();
  } catch (error) {
    console.error("Error in removeFavoriteFromDB:", error);
    return { success: false, error: error.message };
  }
};

export const deleteRecipe = async (id) => {
  try {
    const res = await fetch(`${API_URL}/delete-recipe/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("Could not delete the recipe!");
    }
    return res.json();
  } catch (err) {
    console.error(err);
    return { success: false, message: err.message };
  }
};

export const blockUser = async (id) => {
  try {
    const res = await fetch(`${API_URL}/admin/users/block/${id}`, {
      method: "PATCH",
    });

    if (!res.ok) {
      throw new Error("Failed to block user");
    }
    return res.json();
  } catch (err) {
    console.error(err);
    return { success: false, message: err.message };
  }
};

export const unblockUser = async (id) => {
  try {
    const res = await fetch(`${API_URL}/admin/users/unblock/${id}`, {
      method: "PATCH",
    });

    if (!res.ok) {
      throw new Error("Failed to unblock user");
    }

    return res.json();
  } catch (err) {
    console.error(err);
    return { success: false, message: err.message };
  }
};

export const toggleFeaturedRecipe = async (id) => {
  try {
    const res = await fetch(`${API_URL}/recipes/${id}/feature`, {
      method: "PATCH",
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || "Failed to feature recipe",
      };
    }

    return data;
  } catch (err) {
    console.error("Error toggling feature recipe:", err);
    return { success: false, message: err.message || "Network Error" };
  }
};


// ১. রিপোর্ট জমা দিন (User Action)
export const submitRecipeReport = async (reportData) => {
  try {
    const res = await fetch(`${API_URL}/reports`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reportData),
    });
    return await res.json();
  } catch (err) {
    console.error("Error submitting report:", err);
    return { success: false, message: err.message || "Network Error" };
  }
};

// ২. সব রিপোর্ট গেট করুন (Admin Fetch)
export const getAllReports = async () => {
  try {
    const res = await fetch(`${API_URL}/reports`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch reports");
    return await res.json();
  } catch (err) {
    console.error("Error fetching reports:", err);
    return [];
  }
};

// ৩. রিপোর্ট ডিসমিস করুন (Admin Dismiss Action)
export const dismissReport = async (reportId) => {
  try {
    const res = await fetch(`${API_URL}/reports/${reportId}`, {
      method: "DELETE",
    });
    return await res.json();
  } catch (err) {
    console.error("Error dismissing report:", err);
    return { success: false, message: err.message || "Network Error" };
  }
};

// ৪. রেসিপি রিমুভ করুন (Admin Remove Recipe Action)
export const removeReportedRecipe = async (recipeId) => {
  try {
    const res = await fetch(`${API_URL}/reports/recipe/${recipeId}`, {
      method: "DELETE",
    });
    return await res.json();
  } catch (err) {
    console.error("Error removing recipe:", err);
    return { success: false, message: err.message || "Network Error" };
  }
};
