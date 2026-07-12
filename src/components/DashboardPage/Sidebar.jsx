"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  {
    name: "Overview",
    href: "/dashboard",
    icon: FaHome,
  },
  {
    name: "My Recipes",
    href: "/dashboard/my-recipes",
    icon: FaBook,
  },
  {
    name: "Add Recipe",
    href: "/dashboard/add-recipe",
    icon: FaPlusCircle,
  },

  {
    name: "My Favorites",
    href: "/dashboard/favorites",
    icon: FaHeart,
  },
  {
    name: "My Purchased Recipes",
    href: "/dashboard/purchased-recipes",
    icon: FaCartPlus,
  },
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: FaUser,
  },
];

const adminMenuItem = [
  {
    name: "Overview",
    href: "/dashboard/admin",
    icon: FaHome,
  },
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
  {
    name: "Recipe Reports",
    href: "/dashboard/admin/reports",
    icon: FaFlag,
  },
  {
    name: "Transactions",
    href: "/dashboard/admin/transactions",
    icon: FaMoneyCheckAlt,
  },
];

const SidebarContent = ({ pathname, user }) => (
  <div
    className="h-full flex flex-col md:pt-20 pt-0 md:bg-gray-200/50
dark:bg-gray-900"
  >
    {/* user image & name */}
    <div className=" hidden border-b px-6 py-3 md:flex items-center gap-2">
      <div className="relative">
        <Avatar>
          {user?.image ? (
            <Avatar.Image alt={user?.name} src={user?.image} />
          ) : (
            <Avatar.Fallback>
              {user?.name.slice(0, 2).toUpperCase()}
            </Avatar.Fallback>
          )}
        </Avatar>
        {user?.isPremium && (
          <span className="absolute top-0 -right-1 rounded-full text-yellow-400 text-sm font-semibold ">
            <FaChessQueen />
          </span>
        )}
      </div>

      <div>
        <p>{user?.name}</p>
        <p className="text-sm text-gray-400 line-clamp-1">{user?.email}</p>
      </div>
    </div>

    {/* Menu */}
    <ul className="flex-1 p-4 space-y-2">
      {user?.role === "admin" ? (
        <>
          {adminMenuItem.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-2 rounded-sm px-4 py-1.5 transition-all duration-300
              ${
                pathname === item.href
                  ? " dark:bg-gray-400/50 bg-gray-300"
                  : " dark:hover:bg-gray-400/50 hover:bg-gray-300"
              }`}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </>
      ) : (
        <>
          {" "}
          {userMenuItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-2 rounded-sm px-4 py-1.5 transition-all duration-300
              ${
                pathname === item.href
                  ? " dark:bg-gray-400/50 bg-gray-300"
                  : " dark:hover:bg-gray-400/50 hover:bg-gray-300"
              }`}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </>
      )}

      <Logout />
    </ul>
  </div>
);

const Sidebar = () => {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 min-h-screen ">
        <SidebarContent pathname={pathname} user={user} />
      </aside>

      {/* Mobile Drawer */}
      <div className="absolute inline md:hidden right-0">
        <Drawer>
          <Button isIconOnly variant="light" className="p-2">
            <span>
              {" "}
              <PanelLeftClose />
            </span>
          </Button>

          <Drawer.Backdrop>
            <Drawer.Content placement="left" className="max-w-[280px]">
              <Drawer.Dialog>
                <Drawer.CloseTrigger />

                <Drawer.Body className="p-0">
                  <SidebarContent pathname={pathname} />
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
