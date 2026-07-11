const RecipeInstructions = ({ recipe }) => {
  return (
    <div className="rounded-2xl border border-gray-300 p-6">
      <h2 className="text-2xl font-bold mb-5">
        Instructions
      </h2>

      <p className="leading-8 text-gray-600">
        {recipe?.instructions}
      </p>
    </div>
  );
};

export default RecipeInstructions;