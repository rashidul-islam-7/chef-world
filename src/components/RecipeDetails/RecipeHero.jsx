import Image from "next/image";

const RecipeHero = ({ recipe }) => {
  return (
    <div className="overflow-hidden ">
      <img
        src={recipe?.recipeImage}
        alt={recipe?.recipeName}
        height={400}
        width={1200}
        className="w-full h-[200px] md:h-[300px] object-cover"
      />
    </div>
  );
};

export default RecipeHero;
