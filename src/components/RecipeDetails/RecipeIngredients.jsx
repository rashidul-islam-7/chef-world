const RecipeIngredients = ({ recipe }) => {


  return (
    <div className="rounded-2xl border border-gray-300 p-6">
      <h2 className="text-2xl font-bold mb-5">
        Ingredients
      </h2>

      <ul className="space-y-3">
        {recipe?.ingredients?.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-3"
          >
            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeIngredients;