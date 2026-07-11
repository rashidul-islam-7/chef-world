import FeaturedRecipes from "@/components/HomePage/FeaturedRecipes";
import HeroSection from "@/components/HomePage/HomeHero";
import PopularRecipes from "@/components/HomePage/PopularRecipes";
import React from "react";

const HomePage = () => {
  return (
    <div className="min-h-screen dark:bg-black dark:text-white text-black">
      <div className="">
        <HeroSection />
        <FeaturedRecipes />
        <PopularRecipes />
      </div>
    </div>
  );
};

export default HomePage;
