
import Link from "next/link";
import React from "react";
import { FaEdit } from "react-icons/fa";

const EditRecipe = async ({ recipeId }) => {
  return (
    <div>
      <Link href={`/dashboard/edit-recipe/${recipeId}`}>
        <button
          className="flex items-center gap-2 rounded-sm bg-blue-400 px-3 
        text-sm text-white hover:bg-blue-500  cursor-pointer py-1
            sm font-semibold  
             transition-all active:scale-95"
        >
          <FaEdit />
          Edit
        </button>
      </Link>
    </div>
  );
};

export default EditRecipe;
