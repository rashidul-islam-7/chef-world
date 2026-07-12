const API_URL = "http://localhost:8000";

export const getAllRecipe = async () => {
  try {
    const res = await fetch(`${API_URL}/recipes`, {
      next: {
        revalidate: 60,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch recipes!");
    }
    return res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};

// get data with by id
export const getRecipeById = async (id) => {
  try {
    const res = await fetch(`${API_URL}/recipe/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch recipe!");
    }

    return res.json();
  } catch (err) {
    console.error(err);
  }
};

//get my-recipes with email
export const getMyRecipes = async (email) => {
  try {
    const res = await fetch(`${API_URL}/my-recipes?email=${email}`);
    if (!res.ok) {
      throw new Error("Failed to fetch your recipes!");
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
