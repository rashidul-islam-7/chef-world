import { FaStar } from "react-icons/fa";

const RecipeStatusBadge = ({ featured }) => {
  return featured ? (
    <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
      <FaStar className="text-yellow-500" />
      Featured
    </span>
  ) : (
    <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600">
      Normal
    </span>
  );
};

export default RecipeStatusBadge;