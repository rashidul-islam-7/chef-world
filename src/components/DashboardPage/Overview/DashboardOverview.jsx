"use client";

import { useState, useEffect } from "react";
import { FaBookOpen, FaHeart, FaThumbsUp, FaCrown } from "react-icons/fa";
import OverviewStatsCard from "./OverviewStatsCard";
import { useSessionContext } from "@/components/Provider/SessionProvider";
import { getUserDashboardStats } from "@/lib/getData";

export default function DashboardOverview() {
  const session = useSessionContext();
  const userId = session?.user?.id;
  const user_isPremium = session?.user?.isPremium;

  const [stats, setStats] = useState({
    totalRecipes: 0,
    totalLikes: 0,
    totalFavorites: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!userId) return;
      try {
        setLoading(true);
        const data = await getUserDashboardStats(userId);
        if (data.success) {
          setStats(data.stats);
        }
      } catch (error) {
        console.error("Error setting stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [userId]);

  const statsCardsInfo = [
    {
      title: "Total Recipes",
      value: stats.totalRecipes,
      icon: FaBookOpen,
      iconBg: "bg-orange-100 dark:bg-orange-950/50 text-orange-600",
    },
    {
      title: "Total Favorites",
      value: stats.totalFavorites,
      icon: FaHeart,
      iconBg: "bg-pink-100 dark:bg-pink-950/50 text-pink-600",
    },
    {
      title: "Total Likes",
      value: stats.totalLikes,
      icon: FaThumbsUp,
      iconBg: "bg-blue-100 dark:bg-blue-950/50 text-blue-600",
    },
    {
      title: "Membership",
      value: user_isPremium ? "Premium" : "Free",
      icon: FaCrown,
      iconBg: "bg-yellow-100 dark:bg-yellow-950/50 text-yellow-600",
    },
  ];

  return (
    <section>
      {/* Welcome Section */}
      <div className="mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
          Welcome Back, {session?.user?.name || "Chef"}!
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Manage your recipes, favorites and premium membership.
        </p>
      </div>

      {/* Premium Banner */}
      <div className="mb-6 overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 p-5 text-white shadow-md">
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

          {user_isPremium ? (
            <span className="bg-white text-orange-600 px-5 py-2 rounded-full font-semibold text-sm shadow-sm">
              Premium Active
            </span>
          ) : (
            <form action={"/api/subscription"} method="POST">
              <button
                type="submit"
                className="bg-black/20 hover:bg-black/30 text-white px-5 py-2 rounded-full font-semibold text-sm transition duration-200"
              >
                Upgrade to Premium
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Stats Cards Grid */}
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

      {/* Account Summary Section */}
      <div className="mt-8 rounded-2xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-800 dark:text-gray-200 shadow-sm p-5">
        <h2 className="text-xl font-bold mb-2">Account Summary</h2>
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
          You have successfully published{" "}
          <span className="font-bold text-orange-500 dark:text-orange-400">
            {stats.totalRecipes}
          </span>{" "}
          {stats.totalRecipes === 1 ? "recipe" : "recipes"} and earned a total
          of{" "}
          <span className="font-bold text-blue-500 dark:text-blue-400">
            {stats.totalLikes}
          </span>{" "}
          {stats.totalLikes === 1 ? "like" : "likes"} from the community. Keep
          sharing your amazing dishes!
        </p>
      </div>
    </section>
  );
}
