import RecipeForm from "@/components/DashboardPage/AddRecipe/RecipeForm";
import { auth } from "@/lib/auth";
import { getRecipeById } from "@/lib/getData";
import { headers } from "next/headers";
import React from "react";

const EditRecipe = async ({ params }) => {
  const { id } = await params;
  const recipe = await getRecipeById(id);
  console.log(recipe);
  return (
    <div className="pt-14 md:pt-20">
      <RecipeForm recipe={recipe} />
    </div>
  );
};

export default EditRecipe;
