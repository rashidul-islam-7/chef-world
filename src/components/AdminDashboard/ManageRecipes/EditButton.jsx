"use client";

import Link from "next/link";
import { FaEdit } from "react-icons/fa";

const EditRecipeButton = ({ recipe }) => {
  return (
    <Link
      href={`/dashboard/edit-recipe/${recipe._id}`}
      className="flex items-center  rounded bg-blue-100 px-2 py-1 text-sm font-medium text-blue-600 transition hover:bg-blue-200"
    >
      <FaEdit />
      Edit
    </Link>
  );
};

export default EditRecipeButton;
