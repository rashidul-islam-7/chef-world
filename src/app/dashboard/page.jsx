export const metadata = {
  title: "Dashboard Overview | ChefWorld",
};

import DashboardOverview from "@/components/DashboardPage/Overview/DashboardOverview";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const Dashboard = async () => {
    const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user_isPremium = session?.user.isPremium;

  return (
    <div>
      <DashboardOverview user_isPremium={user_isPremium} />
    </div>
  );
};

export default Dashboard;
