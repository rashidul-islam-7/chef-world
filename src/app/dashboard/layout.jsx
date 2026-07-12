
import Sidebar from "@/components/DashboardPage/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="lg:flex">
      <Sidebar />

      <main className="lg:flex-1 px-4 md:px-8 mt-30 py-10 dark:bg-gray-800 ">
        {children}
      </main>
    </div>
  );
}
