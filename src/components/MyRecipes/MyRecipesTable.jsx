// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { AiFillLike } from "react-icons/ai";
// import { FaPlusCircle } from "react-icons/fa";
// import DeleteRecipe from "./DeleteRecipe";
// import EditRecipe from "./EditRecipe";

// const MyRecipesTable = ({ recipes = [] }) => {
//   return (
//     <>
//       {/* Header */}
//       <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//         <div>
//           <h1 className="text-3xl font-bold dark:text-gray-100">My Recipes</h1>

//           <p className="mt-1 text-gray-500 dark:text-gray-300">
//             Manage all your recipes in one place.
//           </p>
//         </div>

//         <Link
//           href="/dashboard/add-recipe"
//           className="flex items-center gap-2 rounded-sm bg-orange-500 px-5 py-2 text-white transition hover:bg-orange-600"
//         >
//           <FaPlusCircle />
//           Add Recipe
//         </Link>
//       </div>

//       {/* Empty UI */}
//       {recipes.length === 0 ? (
//         <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-dashed">
//           <h2 className="text-2xl font-bold">No Recipes Found</h2>

//           <p className="mt-2 text-gray-500 dark:text-gray-300">
//             Create your first recipe.
//           </p>
//         </div>
//       ) : (
//         <div className="overflow-hidden rounded-2xl border border-gray-200  shadow-sm">
//           {/* Desktop Table */}
//           <div className="hidden overflow-x-auto md:block">
//             <table className="table">
//               <thead className="bg-gray-500 text-white">
//                 <tr>
//                   <th>Recipe</th>
//                   <th>Category</th>
//                   <th>Likes</th>
//                   <th>Status</th>
//                   <th className="text-center">Actions</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {recipes.map((recipe) => (
//                   <tr className="dark:text-gray-200" key={recipe._id}>
//                     <td>
//                       <div className="flex items-center gap-4">
//                         <Image
//                           src={recipe.recipeImage}
//                           alt={recipe.recipeName}
//                           width={56}
//                           height={56}
//                           className="h-14 w-14 rounded-xl object-cover"
//                         />

//                         <div>
//                           <h3 className="font-semibold ">
//                             {recipe.recipeName}
//                           </h3>
//                         </div>
//                       </div>
//                     </td>

//                     <td className="">{recipe.category}</td>

//                     <td>
//                       <div className="flex items-center gap-2 text-blue-500">
//                         <AiFillLike />
//                         {recipe.likesCount}
//                       </div>
//                     </td>

//                     <td>
//                       <span
//                         className={`rounded-full px-3 py-1 text-xs font-medium ${
//                           recipe.status === "approved"
//                             ? "bg-green-100 text-green-600"
//                             : "bg-yellow-100 text-yellow-700"
//                         }`}
//                       >
//                         {recipe.status}
//                       </span>
//                     </td>

//                     <td>
//                       <div className="flex justify-center gap-2">
//                         <EditRecipe recipeId={recipe._id} />
//                         <DeleteRecipe recipeId={recipe._id} />
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Mobile Cards */}
//           <div className="grid gap-4 p-4 md:hidden">
//             {recipes.map((recipe) => (
//               <div
//                 key={recipe._id}
//                 className="rounded-xl border border-gray-200 bg-white p-4"
//               >
//                 <div className="flex gap-3">
//                   <Image
//                     src={recipe.recipeImage}
//                     alt={recipe.recipeName}
//                     width={80}
//                     height={80}
//                     className="h-20 w-20 rounded-lg object-cover"
//                   />

//                   <div className="flex-1">
//                     <h3 className="font-semibold">{recipe.recipeName}</h3>

//                     <p className="text-sm text-gray-500">
//                       Category: {recipe.category}
//                     </p>

//                     <div className="flex items-center gap-3">
//                       <div className="mt-2 flex items-center gap-2">
//                         <AiFillLike />
//                         <span>{recipe.likesCount}</span>
//                       </div>

//                       <span
//                         className={`mt-2 inline-block rounded-full px-3 py-1 text-xs ${
//                           recipe.status === "approved"
//                             ? "bg-green-100 text-green-600"
//                             : "bg-yellow-100 text-yellow-700"
//                         }`}
//                       >
//                         {recipe.status}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-4 flex gap-2">
//                   <EditRecipe recipeId={recipe._id} />
//                   <DeleteRecipe recipeId={recipe._id} />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default MyRecipesTable;

"use client";

import Image from "next/image";
import Link from "next/link";
import { AiFillLike } from "react-icons/ai";
import { FaPlusCircle, FaFolderOpen } from "react-icons/fa";
import DeleteRecipe from "./DeleteRecipe";
import EditRecipe from "./EditRecipe";

const MyRecipesTable = ({ recipes = [] }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header Section */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-6 dark:border-gray-800">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
            My Recipes
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage, edit, and organize all your created recipes in one place.
          </p>
        </div>

        <Link
          href="/dashboard/add-recipe"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-orange-600 hover:shadow-lg active:scale-95"
        >
          <FaPlusCircle className="text-lg" />
          <span>Add New Recipe</span>
        </Link>
      </div>

      {/* Empty State */}
      {recipes.length === 0 ? (
        <div className="flex min-h-[350px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-8 text-center dark:border-gray-800 dark:bg-gray-900/50">
          <div className="rounded-full bg-orange-100 p-4 text-orange-500 dark:bg-orange-950/40 dark:text-orange-400">
            <FaFolderOpen className="text-4xl" />
          </div>
          <h2 className="mt-4 text-xl font-bold text-gray-800 dark:text-gray-200">
            No Recipes Found
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 max-w-sm">
            You haven't added any recipes yet. Click below to publish your first
            recipe!
          </p>
          <Link
            href="/dashboard/add-recipe"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-orange-500 hover:text-orange-600 dark:text-orange-400"
          >
            <FaPlusCircle /> Add First Recipe
          </Link>
        </div>
      ) : (
        /* Recipe Cards Grid */
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
            >
              {/* Card Image Container */}
              <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                <Image
                  src={recipe.recipeImage}
                  alt={recipe.recipeName}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Status Badge */}
                <span
                  className={`absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-md shadow-sm ${
                    recipe.status === "approved"
                      ? "bg-emerald-500/90 text-white"
                      : "bg-amber-500/90 text-white"
                  }`}
                >
                  {recipe.status === "approved" ? "Approved" : "Pending"}
                </span>

                {/* Category Badge */}
                <span className="absolute bottom-3 left-3 rounded-lg bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md">
                  {recipe.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col justify-between p-5">
                <div className="">
                  <h3 className="line-clamp-1 text-lg font-bold text-gray-800 dark:text-gray-100 group-hover:text-orange-500 transition-colors">
                    {recipe.recipeName}
                  </h3>
                  <p className="text-gray-500 dark:text-white">$-{recipe.price}</p>
                </div>

                {/* Likes Count & Actions Footer */}
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  {/* Likes */}
                  <div className="flex items-center gap-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2.5 py-1.5 rounded-lg">
                    <AiFillLike className="text-sm" />
                    <span>{recipe.likesCount || 0} Likes</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-1">
                    <EditRecipe recipeId={recipe._id} />
                    <DeleteRecipe recipeId={recipe._id} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRecipesTable;
