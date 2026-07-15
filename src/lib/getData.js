import { json } from "better-auth";
import { data } from "motion/react-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
    return null;
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

// delete my-recipes with id
export const deleteMyRecipe = async (id, email) => {
  try {
    const res = await fetch(`${API_URL}/delete-my-recipe/${id}`, {
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

//get my purchased recipes
export const getMyPurchasedRecipes = async (userId) => {
  try {
    const res = await fetch(`${API_URL}/my-purchased-recipes/${userId}`);

    console.log("fetch", res);
    console.log("fetch", (await res).status);
    if (!res.ok) {
      throw new Error("Failed to fetch purchased recipes");
    }
    const data = res.json();
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};
