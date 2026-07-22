import Image from "next/image";
import EditRecipeButton from "./EditButton";
import FeatureRecipeButton from "./FeatureButton";
import DeleteRecipe from "@/components/MyRecipes/DeleteRecipe";

export default function RecipeRow({ recipe, index, isFeatured }) {
  return (
    <tr className="border-b dark:border-gray-800">
      <td>{index + 1}</td>
      <td>
        <div className="flex items-center gap-3">
          <Image
            src={recipe.recipeImage}
            alt={recipe.recipeName}
            width={40}
            height={40}
            className="h-10 w-10 rounded-lg object-cover"
          />
          <span className="font-medium">{recipe.recipeName}</span>
        </div>
      </td>
      <td>{recipe.authorName}</td>
      <td>{recipe.category}</td>
      <td>${recipe.price}</td>
      <td>
        <div className="flex items-center justify-center gap-2">
          <EditRecipeButton recipe={recipe} />
          <DeleteRecipe recipeId={recipe._id} />
          <FeatureRecipeButton
            recipeId={recipe._id}
            initialFeatured={isFeatured}
          />
        </div>
      </td>
    </tr>
  );
}
