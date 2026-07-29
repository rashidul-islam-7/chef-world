// import FeaturedRecipes from "@/components/HomePage/FeaturedRecipes";
// import HeroSection from "@/components/HomePage/HomeHero";
// import JoinCommunity from "@/components/HomePage/JoinWithUs";
// import PopularRecipes from "@/components/HomePage/PopularRecipes";
// import PremiumGiftOffer from "@/components/HomePage/PremiumGiftOffer";
// import React from "react";

// const HomePage = () => {
//   return (
//     <div className="min-h-screen dark:bg-black dark:text-white text-black">
//       <div className="">
//         <HeroSection />
//         <FeaturedRecipes />
//         <PopularRecipes />
//         <PremiumGiftOffer />
//         <JoinCommunity />
//       </div>
//     </div>
//   );
// };

// export default HomePage;

import { Suspense } from "react";
import FeaturedRecipes from "@/components/HomePage/FeaturedRecipes";
import HeroSection from "@/components/HomePage/HomeHero";
import JoinCommunity from "@/components/HomePage/JoinWithUs";
import PopularRecipes from "@/components/HomePage/PopularRecipes";
import PremiumGiftOffer from "@/components/HomePage/PremiumGiftOffer";

// Simple Loading Skeleton
const SectionSkeleton = () => (
  <div className="w-full h-64 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg my-6 flex items-center justify-center">
    <p className="text-gray-400">Loading...</p>
  </div>
);

const HomePage = () => {
  return (
    <div className="min-h-screen dark:bg-black dark:text-white text-black">
      <div>
        {/* Static Section */}
        <HeroSection />

        {/* API Section 1 */}
        <Suspense fallback={<SectionSkeleton />}>
          <FeaturedRecipes />
        </Suspense>

        {/* API Section 2 */}
        <Suspense fallback={<SectionSkeleton />}>
          <PopularRecipes />
        </Suspense>

        {/* Static Sections */}
        <PremiumGiftOffer />
        <JoinCommunity />
      </div>
    </div>
  );
};

export default HomePage;
