"use client";
import { IoFastFoodSharp } from "react-icons/io5";

const Loading = ({children}) => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="relative">
          {/* Rotating Ring */}
          <div className="absolute inset-0 h-10 w-10 rounded-full border-4 border-orange-200 border-t-orange-500 animate-spin"></div>

          {/* Logo */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-500 shadow-xl">
            <IoFastFoodSharp />
          </div>
        </div>

        {/* Text */}
        <h2 className="mt-2 text-2xl font-bold">
          Chef<span className="text-orange-500">World</span>
        </h2>

        <p className=" text-gray-500">{children || "Loading Recipe...."}.</p>

        {/* Dots Loader */}
        <div className="mt-3 flex gap-2">
          <span className="h-2 w-2 animate-bounce rounded-full bg-orange-500"></span>
          <span
            className="h-2 w-2 animate-bounce rounded-full bg-orange-500"
            style={{ animationDelay: "0.15s" }}
          ></span>
          <span
            className="h-2 w-2 animate-bounce rounded-full bg-orange-500"
            style={{ animationDelay: "0.3s" }}
          ></span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
