"use client";


const categories = [
  "All",
  "Rice",
  "Fast Food",
  "Pasta",
  "Pizza",
  "Noodles",
  "Seafood",
  "Salad",
  "Dessert",
  "Street Food",
];


const FilterRecipe = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mt-6 mb-12">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`rounded-full px-5 py-1.5 text-sm shadow font-medium transition-all cursor-pointer
            ${
              selectedCategory === category
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-black hover:bg-orange-100"
            }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default FilterRecipe;
