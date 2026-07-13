"use client";
import { authClient } from "@/lib/auth-client";
import { postRecipe, updateRecipe } from "@/lib/postData";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const RecipeForm = ({ recipe }) => {
  const isUpdate = !!recipe;

  const [imagePreview, setImagePreview] = useState(recipe?.recipeImage || "");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //check have a user
    if (!user) {
      toast.error("Please login first");
      return;
    }
    try {
      setLoading(true);
      let imageUrl = recipe?.recipeImage || "";
      // Upload new image if selected
      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append("image", imageFile);

        const imageRes = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
          {
            method: "POST",
            body: imageFormData,
          },
        );

        const imageData = await imageRes.json();

        if (!imageData.success) {
          toast.error("Image upload failed");
          return;
        }
        imageUrl = imageData.data.display_url;
      }

      if (!imageUrl) {
        toast.error("Please select an image");
        return;
      }

      const form = e.target;
      const recipeData = {
        recipeName: form.recipeName.value,
        recipeImage: imageUrl,
        category: form.category.value,
        cuisineType: form.cuisineType.value,
        difficultyLevel: form.difficultyLevel.value,
        preparationTime: Number(form.preparationTime.value),
        price: form.price.value,
        ingredients: form.ingredients.value
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        instructions: form.instructions.value,
        authorId: user.id,
        authorName: user.name,
        authorEmail: user.email,
        updatedAt: new Date(),
      };

      // update recipe
      if (isUpdate) {
        const data = await updateRecipe(recipeData, recipe._id);

        if (data.modifiedCount > 0) {
          toast.success("Recipe updated successfully!");
          router.push("/dashboard/my-recipes");
        }
      }

      // add recipe
      else {
        const newRecipe = {
          ...recipeData,
          likesCount: 0,
          favoriteCount: 0,
          status: "approved",
          createdAt: new Date(),
        };

        const data = await postRecipe(newRecipe);

        if (data.insertedId) {
          toast.success("Recipe added successfully!");

          form.reset();
          setImageFile(null);
          setImagePreview("");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-3">
      {/* FORM */}
      <div className="lg:col-span-2 rounded-2xl border border-gray-200 p-4 md:p-6 shadow-sm">
        <div className="grid gap-5 md:grid-cols-2">
          {/* Recipe Name */}
          <div className="md:col-span-2 dark:text-gray-100">
            <label className="mb-1 block font-medium">Recipe Name</label>
            <input
              name="recipeName"
              required
              type="text"
              defaultValue={recipe?.recipeName}
              placeholder="Rice"
              className="w-full rounded border px-4 py-2 outline-none focus:border-orange-500 dark:bg-gray-800  dark:text-gray-300"
            />
          </div>

          {/* Category */}
          <div>
            <label className="mb-1 block font-medium dark:text-gray-100">
              Category
            </label>
            <select
              name="category"
              required
              defaultValue={recipe?.category}
              className="w-full rounded border px-4 py-2 outline-none
         dark:bg-gray-800 focus:border-orange-500  dark:text-gray-300"
            >
              <option value="">Select Category</option>
              <option>Rice</option>
              <option>Fast Food</option>
              <option>Dessert</option>
              <option>Pizza</option>
              <option>Seafood</option>
              <option>Pasta</option>
              <option>Soup</option>
              <option>Salad</option>
              <option>Chicken</option>
              <option>Beef</option>
              <option>Mutton</option>
              <option>Vegetarian</option>
              <option>Breakfast</option>
            </select>
          </div>

          {/* Cuisine */}
          <div>
            <label className="mb-1 block font-medium dark:text-gray-100">
              Cuisine Type
            </label>
            <input
              name="cuisineType"
              required
              type="text"
              defaultValue={recipe?.cuisineType}
              placeholder="Bangladesh"
              className="w-full rounded border px-4 py-2 outline-none focus:border-orange-500 dark:bg-gray-800 dark:text-gray-300"
            />
          </div>

          {/* Difficulty */}
          <div>
            <label className="mb-1 block font-medium dark:text-gray-100">
              Difficulty
            </label>
            <select
              name="difficultyLevel"
              required
              defaultValue={recipe?.difficultyLevel}
              className="w-full rounded border px-4 py-2 outline-none focus:border-orange-500 dark:bg-gray-800  dark:text-gray-300"
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          {/* Preparation Time */}
          <div>
            <label className="mb-1 block font-medium dark:text-gray-100">
              Preparation Time (Min)
            </label>
            <input
              name="preparationTime"
              required
              type="number"
              defaultValue={recipe?.preparationTime}
              placeholder="30"
              className="w-full rounded border px-4 py-2 outline-none focus:border-orange-500 dark:bg-gray-800 dark:text-gray-300"
            />
          </div>

          {/* Price */}
          <div className="md:col-span-2 dark:text-gray-100">
            <label className="mb-1 block font-medium">Price (USD-$)</label>
            <input
              name="price"
              required
              type="number"
              defaultValue={recipe?.price}
              placeholder="10"
              className="w-full rounded border px-4 py-2 outline-none focus:border-orange-500 dark:bg-gray-800"
            />
          </div>

          {/* Image Upload */}
          <div className="md:col-span-2 dark:text-gray-100">
            <label className="mb-1 block font-medium">Recipe Image</label>
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-5 text-center hover:border-orange-500">
              <FaCloudUploadAlt className="text-4xl text-orange-500" />
              <p className="mt-2">
                {isUpdate
                  ? "Upload new image (optional)"
                  : "Click to upload recipe image"}
              </p>
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImage}
              />
            </label>
          </div>

          {/* Ingredients */}
          <div className="md:col-span-2 dark:text-gray-100">
            <label className="mb-1 block font-medium">Ingredients</label>
            <textarea
              name="ingredients"
              required
              rows={3}
              defaultValue={recipe?.ingredients?.join(", ")}
              placeholder="Chicken, Basmati Rice, Onion, Garlic, Ginger"
              className="w-full rounded-xl border px-4 py-2 outline-none focus:border-orange-500 dark:bg-gray-800"
            />
          </div>

          {/* Instructions */}
          <div className="md:col-span-2 dark:text-gray-100">
            <label className="mb-1 block font-medium">Instructions</label>
            <textarea
              name="instructions"
              required
              rows={5}
              defaultValue={recipe?.instructions}
              placeholder="Marinate chicken, cook rice separately, layer together and steam."
              className="w-full rounded-xl border px-4 py-2 outline-none focus:border-orange-500 dark:bg-gray-800"
            />
          </div>
        </div>

        <button
          disabled={loading}
          type="submit"
          className="mt-5 w-full rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:opacity-60"
        >
          {loading
            ? isUpdate
              ? "Updating..."
              : "Adding..."
            : isUpdate
              ? "Update Recipe"
              : "Create Recipe"}
        </button>
      </div>

      {/* PREVIEW */}
      <div className="h-fit rounded-2xl border border-gray-200 bg-white dark:bg-gray-900  dark:text-gray-100 p-4 shadow-sm">
        <h3 className="text-xl font-bold  dark:text-gray-300">
          Recipe Preview
        </h3>
        <div className="mt-4 overflow-hidden rounded-2xl border dark:border-gray-800">
          <img
            src={
              imagePreview ||
              "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1000"
            }
            alt="preview"
            className="h-56 w-full object-cover"
          />
        </div>
      </div>
    </form>
  );
};

export default RecipeForm;
