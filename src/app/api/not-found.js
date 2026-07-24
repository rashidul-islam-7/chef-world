"use client";

import Link from "next/link";
import { FaHome, FaArrowLeft } from "react-icons/fa";
import { LuChefHat } from "react-icons/lu";

const NotFound = () => {
  return (
    <section className="min-h-screen flex items-center justify-center mt-20  px-5">
      <div className="max-w-3xl mx-auto text-center">
        {/* Illustration */}
        <div className="flex justify-center">
          <div className="relative">
            <LuChefHat className="text-[70px]  text-orange-500" />

            <div className="absolute top-2 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-lg font-bold text-white shadow-lg">
              !
            </div>
          </div>
        </div>

        {/* 404 */}
        <h1 className=" text-5xl font-extrabold text-orange-500 md:text-6xl">
          404
        </h1>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-900 ">
          Recipe Not Found
        </h2>

        {/* Description */}
        <p className="mx-auto mt-3 max-w-xl text-base text-gray-600 md:text-lg">
          Looks like the recipe you're searching for has gone missing from our
          kitchen. The page may have been removed, renamed, or never existed.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-orange-600"
          >
            <FaHome />
            Back Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-gray-300 px-8 py-3 font-semibold text-gray-700 transition-all duration-300 hover:border-orange-500 hover:text-orange-500"
          >
            <FaArrowLeft />
            Go Back
          </button>
        </div>

        {/* Decorative Cards */}
        <div className="my-10 hidden grid-cols-3 gap-5 md:grid">
          <div className="rounded-2xl  p-5 border shadow-lg">
            <div className="text-4xl">🍕</div>
            <h3 className="mt-3 font-semibold">Popular Recipes</h3>
            <p className="mt-1 text-sm text-gray-500">
              Discover trending recipes loved by our community.
            </p>
          </div>

          <div className="rounded-2xl e p-5 border shadow-lg">
            <div className="text-4xl">🥗</div>
            <h3 className="mt-3 font-semibold">Healthy Foods</h3>
            <p className="mt-1 text-sm text-gray-500">
              Explore nutritious and healthy meal ideas.
            </p>
          </div>

          <div className="rounded-2xl e p-5 border shadow-lg">
            <div className="text-4xl">🍰</div>
            <h3 className="mt-3 font-semibold">Sweet Desserts</h3>
            <p className="mt-1 text-sm text-gray-500">
              Enjoy delicious cakes, pastries and desserts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
