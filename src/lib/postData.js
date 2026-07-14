const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Post Recipe
export const postRecipe = async (recipeData) => {
  try {
    const res = await fetch(`${API_URL}/add-recipe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeData),
    });

    const data = await res.json();

    console.log("Status:", res.status);
    console.log("Response:", data);

    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
};

// Update Recipe
export const updateRecipe = async (updateRecipeData, id) => {
  try {
    const res = await fetch(`${API_URL}/update-recipe/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateRecipeData),
    });

    if (!res.ok) {
      throw new Error("Failed to update recipe");
    }

    return await res.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const postSubscription = async (data) => {
  const res = await fetch(`${API_URL}/premium-user-subscription`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to get subscription");
  }

  return res.json();
};

export const postPurchasedRecipe = async (data) => {
  const res = await fetch(`${API_URL}/purchase-recipe-payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(res)
  console.log(res.status)

  if (!res.ok) {
    throw new Error("Failed to save purchased recipe");
  }

  return res.json();
};