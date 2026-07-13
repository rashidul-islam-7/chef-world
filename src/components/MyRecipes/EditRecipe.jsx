
import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { FaEdit } from "react-icons/fa";

const EditRecipe = async ({ recipeId }) => {

  console.log(recipeId)

  return (
    <div>
      <Link href={`/dashboard/edit-recipe/${recipeId}`}>
        <Button className="flex items-center gap-2 rounded-sm bg-blue-400 px-3 text-sm text-white hover:bg-blue-500">
          <FaEdit />
          Edit
        </Button>
      </Link>
    </div>
  );
};

export default EditRecipe;
