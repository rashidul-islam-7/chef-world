"use client";

import { FaBookOpen, FaHeart, FaThumbsUp, FaCrown } from "react-icons/fa";
import OverviewStatsCard from "./OverviewStatsCard";
import { useState } from "react";

export default function DashboardOverview() {
  const [favorites, setFavorites] = useState([]);
  const user_isPremium = false;

  const stats = {
    totalRecipes: 0,
    totalLikes: 0,
    totalFavorites: 0,
  };

  const statsCardsInfo = [
    {
      title: "Total Recipes",
      value: stats?.totalRecipes,
      icon: FaBookOpen,
      iconBg: "bg-orange-100",
    },
    {
      title: "Total Favorites",
      value: favorites.length,
      icon: FaHeart,
      iconBg: "bg-pink-100",
    },
    {
      title: "Total Likes",
      value: stats?.totalLikes,
      icon: FaThumbsUp,
      iconBg: "bg-blue-100",
    },
    {
      title: "Membership",
      value: user_isPremium ? "Premium" : "Free",
      icon: FaCrown,
      iconBg: "bg-yellow-100",
    },
  ];

  return (
    <section>
      {/* Welcome Section */}
      <div className="mb-10">
        <h1 className="text-2xl md:text-3xl font-bold dark:text-gray-100">
          Welcome Back
        </h1>

        <p className="mt-2 text-gray-500 dark:text-gray-300">
          Manage your recipes, favorites and premium membership.
        </p>
      </div>

      {/* Premium Banner */}
      <div className="mb-6 overflow-hidden rounded-2xl bg-linear-to-r from-orange-500 to-amber-500 p-5 text-white">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <FaCrown className="text-yellow-200 text-xl" />
              <h2 className="text-xl font-bold">Premium Membership</h2>
            </div>

            <p className="mt-1 text-orange-50">
              Unlock unlimited recipe uploads and premium features.
            </p>
          </div>

          <span
            className={`px-5 py-2 rounded-full font-semibold ${
              user_isPremium ? "bg-white text-orange-600" : "bg-black/20"
            }`}
          >
            {user_isPremium ? "Premium Active" : "Free User"}
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {statsCardsInfo.map((card) => (
          <OverviewStatsCard
            key={card.title}
            title={card.title}
            value={card.value}
            icon={card.icon}
            iconBg={card.iconBg}
          />
        ))}
      </div>

      {/* Optional Activity Section */}
      <div className="mt-8 rounded-2xl border border-gray-200 bg-white dark:bg-gray-500/30 dark:text-white shadow p-4">
        <h2 className="text-xl font-bold">Account Summary</h2>

        <p className="mt-1 text-gray-500 dark:text-gray-300">
          You have created{" "}
          <span className="font-semibold text-black dark:text-white ">
            {stats?.totalRecipes}
          </span>{" "}
          recipes and received{" "}
          <span className="font-semibold text-black dark:text-white ">
            {stats?.totalLikes}
          </span>{" "}
          likes from the community.
        </p>
      </div>
    </section>
  );
}
