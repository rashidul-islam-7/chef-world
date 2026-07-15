"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaPlusCircle,
  FaBook,
  FaHeart,
  FaUser,
  FaChessQueen,
  FaCartPlus,
  FaUsers,
  FaUtensils,
  FaFlag,
  FaMoneyCheckAlt,
} from "react-icons/fa";

import { Avatar, Button, Drawer } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { PanelLeftClose } from "lucide-react";
import Logout from "../Logout";

const userMenuItems = [
  { name: "Overview", href: "/dashboard", icon: FaHome },
  { name: "My Recipes", href: "/dashboard/my-recipes", icon: FaBook },
  { name: "Add Recipe", href: "/dashboard/add-recipe", icon: FaPlusCircle },
  { name: "My Favorites", href: "/dashboard/favorites", icon: FaHeart },
  {
    name: "My Purchased Recipes",
    href: "/dashboard/my-purchased-recipes",
    icon: FaCartPlus,
  },
  { name: "Profile", href: "/dashboard/profile", icon: FaUser },
];

const adminMenuItem = [
  { name: "Overview", href: "/dashboard/admin", icon: FaHome },
  {
    name: "Manage Users",
    href: "/dashboard/admin/manage-users",
    icon: FaUsers,
  },
  {
    name: "Manage Recipes",
    href: "/dashboard/admin/manage-recipes",
    icon: FaUtensils,
  },
  { name: "Recipe Reports", href: "/dashboard/admin/reports", icon: FaFlag },
  {
    name: "Transactions",
    href: "/dashboard/admin/transactions",
    icon: FaMoneyCheckAlt,
  },
];

const SidebarContent = ({ pathname, user }) => {
  const menuItems = user?.role === "admin" ? adminMenuItem : userMenuItems;

  return (
    <div className="h-full flex flex-col md:pt-20 pt-0 bg-gray-50 md:bg-gray-200/50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* User Info Section */}
      {user && (
        <div className="border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center gap-3">
          <div className="relative">
            <Avatar className="w-10 h-10">
              {user?.image ? (
                <Avatar.Image alt={user?.name} src={user?.image} />
              ) : (
                <Avatar.Fallback className="bg-gray-300 dark:bg-gray-700 text-sm font-bold">
                  {user?.name?.slice(0, 2).toUpperCase() || "US"}
                </Avatar.Fallback>
              )}
            </Avatar>
            {user?.isPremium && (
              <span className="absolute -top-1 -right-1 text-yellow-500 text-xs drop-shadow-sm">
                <FaChessQueen />
              </span>
            )}
          </div>

          <div className="overflow-hidden">
            <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
              {user?.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {user?.email}
            </p>
          </div>
        </div>
      )}

      {/* Menu Navigation */}
      <ul className="flex-1 p-4 space-y-1.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-4 py-2.5 text-sm font-medium transition-all duration-200
                  ${
                    isActive
                      ? "bg-gray-300/80 dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-200/60 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-white"
                  }`}
              >
                <Icon
                  size={18}
                  className={
                    isActive
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-500 dark:text-gray-400"
                  }
                />
                <span>{item.name}</span>
              </Link>
            </li>
          );
        })}

        <div className="pt-4 border-t border-gray-200 dark:border-gray-800 mt-2">
          <Logout />
        </div>
      </ul>
    </div>
  );
};

const Sidebar = () => {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 min-h-screen border-r border-gray-200 dark:border-gray-800">
        <SidebarContent pathname={pathname} user={user} />
      </aside>

      {/* Mobile Drawer */}
      <div className="absolute inline lg:hidden right-4 top-20 z-50">
        <Drawer>
          <Button
            isIconOnly
            variant="light"
            className="p-2 text-2xl text-gray-700 dark:text-gray-300"
          >
            <PanelLeftClose size={24} />
          </Button>

          <Drawer.Backdrop>
            <Drawer.Content
              placement="left"
              className="max-w-[280px] bg-gray-50 dark:bg-gray-900"
            >
              <Drawer.Dialog>
                <Drawer.CloseTrigger className="absolute right-4 top-4 text-gray-500 dark:text-gray-400" />
                <Drawer.Body className="p-0 h-full">
                  <SidebarContent pathname={pathname} user={user} />
                </Drawer.Body>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      </div>
    </>
  );
};

export default Sidebar;
