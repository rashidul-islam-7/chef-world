
import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchRecipe = ({ setSearchText, searchText }) => {
  return (
    <div>
      {/* Search */}
      <div className="relative max-w-xl mx-auto mt-5 md:mb-8">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

        <input
          type="text"
          placeholder="Search recipes..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full rounded-xl border dark:text-gray-100 border-gray-200 py-2 pl-12 pr-4 outline-none focus:border-orange-500"
        />
      </div>
    </div>
  );
};

export default SearchRecipe;
