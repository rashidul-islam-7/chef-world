"use client";

import Link from "next/link";
import React from "react";
import { RiMenu2Fill } from "react-icons/ri";
import { usePathname, useRouter } from "next/navigation";
import { Avatar } from "@heroui/react";
import ThemeButton from "./ThemeButton";

const NavBar = () => {
  const pathname = usePathname();

  const navLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Browse Recipes",
      href: "/recipes",
    },
  ];

  const activeClass =
    "border-b-2 border-orange-300 pb-0.5 dark:text-white hover:text-orange-300 font-medium";

  const normalClass =
    "text-base hover:text-orange-300 dark:text-white transition-colors duration-200";

  return (
    <div className="relative">
      <div className="navbar bg-gray-100 dark:bg-gray-900 shadow-sm px-4 py-2 md:py-4 sm:px-8 md:px-16 fixed top-0 left-0 w-full z-50 ">
        {/* Left */}
        <div className="navbar-start">
          {/* Mobile Menu */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className=" p-2 mr-2 lg:hidden">
              <RiMenu2Fill size={22} />
            </div>

            <div
              tabIndex={0}
              className="dropdown-content bg-base-100 rounded-box z-50 mt-3 w-56 p-4 shadow"
            >
              <ul className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={
                        pathname === link.href ? activeClass : normalClass
                      }
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}

                {
                  <li>
                    <Link
                      href={"/dashboard"}
                      className={
                        pathname.startsWith("/dashboard")
                          ? activeClass
                          : normalClass
                      }
                    >
                      Dashboard
                    </Link>
                  </li>
                }
              </ul>
            </div>
          </div>

          {/* Logo */}
          <Link
            href={"/"}
            className="text-2xl lg:text-3xl dark:text-white font-extrabold -ml-2 "
          >
            <span className="md:block hidden">
              {" "}
              Cook<span className="text-orange-500">World</span>
            </span>
            <span className="block md:hidden">
              {" "}
              C<span className="text-orange-500">W</span>
            </span>
          </Link>
        </div>

        {/* Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={pathname === link.href ? activeClass : normalClass}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={"/dashboard"}
                className={
                  pathname.startsWith("/dashboard") ? activeClass : normalClass
                }
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Right */}
        <div className="navbar-end">
          {/* <Link href={"/dashboard/profile"}>
            <div className="flex items-center gap-2">
              <p className="hidden md:block font-medium ">{user?.name || "Rashed"}</p>
              <Avatar className="border-2 border-gray-400">
                {user?.image ? (
                  <Avatar>
                    <Avatar.Image alt={user?.name} src={user?.image} />
                  </Avatar>
                ) : (
                  <Avatar.Fallback>
                    {user?.name.slice(0, 2).toUpperCase()}
                  </Avatar.Fallback>
                )}
              </Avatar>
            </div>
          </Link> */}

          <div className="flex items-center gap-3">
            <Link href="/signin" className={`font-medium hidden dark:text-white md:block`}>
              Login
            </Link>

            <Link
              href="/signup"
              className={`rounded-full px-5 py-1 text-white transition-all bg-orange-400 hover:bg-orange-500
                `}
            >
              Register
            </Link>
          </div>
        </div>

        <ThemeButton />
      </div>
    </div>
  );
};

export default NavBar;
