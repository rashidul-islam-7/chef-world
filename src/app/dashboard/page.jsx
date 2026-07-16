export const metadata = {
  title: "Dashboard Overview | ChefWorld",
};

import DashboardOverview from "@/components/DashboardPage/Overview/DashboardOverview";

const Dashboard = async () => {
  return (
    <div>
      <DashboardOverview />
    </div>
  );
};

export default Dashboard;
