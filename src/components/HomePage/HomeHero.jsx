"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import { FaUsers } from "react-icons/fa";
import { MdRestaurantMenu } from "react-icons/md";
import { AiFillHeart, AiFillLike } from "react-icons/ai";
import { GiChefToque } from "react-icons/gi";
import { BsFire } from "react-icons/bs";
import { FaBowlFood } from "react-icons/fa6";

import { Utensils } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-8  md:py-10">
      {/* Background */}
      <div
        className="absolute inset-0 bg-linear-to-br from-orange-50 via-yellow-50 to-white dark:from-gray-800 dark:via-gray-950 
      dark:to-black"
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1 text-sm font-medium text-orange-600 shadow-sm transition-all hover:bg-orange-100">
              <Utensils className="w-4 h-4" />
              <span>Welcome to CookWorld</span>
            </span>

            <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl  font-extrabold leading-tight">
              Discover, Share &
              <span className="text-orange-500"> Cook Amazing Recipes</span>
            </h1>

            <p className="mt-5 text-base md:text-lg text-default-500 leading-relaxed max-w-xl">
              Explore thousands of delicious recipes, save your favorites, and
              share your own culinary creations with food lovers from around the
              world.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/recipes"
                className="px-7 py-3 rounded-xl bg-orange-500 text-white font-medium hover:bg-orange-600 transition-all duration-300 text-center"
              >
                Browse Recipes
              </Link>

              <Link
                href="/dashboard"
                className="px-7 py-3 rounded-xl border border-orange-500 text-orange-500 font-medium hover:bg-orange-500 hover:text-white transition-all duration-300 text-center"
              >
                Share Recipe
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-3 md:gap-6 max-w-auto">
              <div className="flex items-center justify-center gap-3 py-2 rounded md:rounded-xl shadow bg-black/10">
                <MdRestaurantMenu className="hidden md:block text-3xl text-orange-500" />
                <div>
                  <h3 className="text-2xl font-bold">10K+</h3>
                  <p className="text-sm text-default-500">Recipes</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3  py-2 rounded md:rounded-xl shadow bg-black/10">
                <FaUsers className="hidden md:block text-3xl text-orange-500" />
                <div>
                  <h3 className="text-2xl font-bold">5M+</h3>
                  <p className="text-sm text-default-500">Food Lovers</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4  py-2 rounded md:rounded-xl shadow bg-black/10">
                <AiFillLike className="hidden md:block text-3xl text-orange-500" />
                <div>
                  <h3 className="text-2xl font-bold">42K+</h3>
                  <p className="text-sm text-default-500">Likes Shared</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main Image */}
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="https://i.ibb.co.com/dwxXhVQn/foods.jpg"
                alt="Delicious plated food"
                width={700}
                height={700}
                className="w-full h-75 md:h-125 object-cover"
              />
            </div>

            {/* Floating Card 1  */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-5 left-5 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-gray-100 dark:border-zinc-800 will-change-transform transform-gpu backface-hidden"
            >
              <BsFire className="text-2xl text-orange-500" />
              <div>
                <h4 className="font-semibold text-zinc-800 dark:text-zinc-200">
                  Featured Recipes
                </h4>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  150+ curated dishes
                </p>
              </div>
            </motion.div>

            {/* Floating Card 2  */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: [0, 6, 0],
              }}
              transition={{
                opacity: { duration: 1 },
                scale: { duration: 1 },
                x: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className="absolute bottom-8 left-0 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-gray-100 dark:border-zinc-800 will-change-transform transform-gpu backface-hidden"
            >
              <AiFillHeart className="text-2xl text-red-500" />
              <div>
                <h4 className="font-semibold text-zinc-800 dark:text-zinc-200">
                  Community Favorites
                </h4>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  5M+ likes received
                </p>
              </div>
            </motion.div>

            {/* Floating Card 3  */}
            <motion.div
              animate={{
                x: [0, 4, 0],
                y: [0, 4, 0],
              }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-1/2 right-0 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-gray-100 dark:border-zinc-800 will-change-transform transform-gpu backface-hidden"
            >
              <GiChefToque className="text-2xl text-orange-500" />
              <div>
                <h4 className="font-semibold text-zinc-800 dark:text-zinc-200">
                  Expert Chefs
                </h4>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  500+ creators
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
