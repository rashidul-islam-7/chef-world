import OverviewStatsCard from "@/components/DashboardPage/Overview/OverviewStatsCard";
import { auth } from "@/lib/auth";
import { getAdminDashboardStats } from "@/lib/getData";
import { FaUsers, FaUtensils, FaCrown, FaFlag } from "react-icons/fa";

const AdminDashboard = async () => {
  const overview = await getAdminDashboardStats();

  const statsCardsInfo = [
    {
      title: "Total Users",
      value: overview?.totalUsers,
      icon: FaUsers,
      iconBg: "bg-orange-100",
    },
    {
      title: "Total Recipes",
      value: overview?.totalRecipes,
      icon: FaUtensils,
      iconBg: "bg-pink-100",
    },
    {
      title: "Pro Members",
      value: overview?.totalPremiumMembers,
      icon: FaCrown,
      iconBg: "bg-green-200",
    },
    {
      title: "Total Reports",
      value: overview?.totalReports,
      icon: FaFlag,
      iconBg: "bg-red-300",
    },
  ];

  return (
    <section className="p-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>

        <p className="mt-2">Welcome back, Admin 👋</p>
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
            iconColor={card.iconColor}
          />
        ))}
      </div>
    </section>
  );
};

export default AdminDashboard;
