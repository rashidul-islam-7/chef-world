"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { MdMarkEmailRead, MdPhoneMissed } from "react-icons/md";
import { TiLocation } from "react-icons/ti";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white border-t border-t-gray-500 ">
      <div
        className="max-w-7xl mx-auto px-6 lg:px-16 py-16 
"
      >
        {/* Main Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & About */}
          <div>
            <h2 className="text-3xl font-extrabold">
              Chef<span className="text-orange-500">World</span>
            </h2>

            <p className="mt-4 text-default-500 leading-relaxed text-sm">
              Discover, create, and share delicious recipes with food lovers
              around the world. Your culinary journey starts here.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Quick Links</h3>

            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-default-500 hover:text-orange-500 duration-300"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/recipes"
                  className="text-default-500 hover:text-orange-500 duration-300"
                >
                  Browse Recipes
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard"
                  className="text-default-500 hover:text-orange-500 duration-300"
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  href="/profile"
                  className="text-default-500 hover:text-orange-500 duration-300"
                >
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Contact Information</h3>

            <div className="space-y-4 text-sm text-default-500">
              <a
                href="mailto:support@cookworld.com"
                className="flex items-center gap-3 hover:text-orange-500 transition-colors"
              >
                <MdMarkEmailRead className="text-lg" />
                <span>support@cookworld.com</span>
              </a>

              <a
                href="tel:+8801700000000"
                className="flex items-center gap-3 hover:text-orange-500 transition-colors"
              >
                <MdPhoneMissed className="text-lg" />
                <span>+880 1700-000000</span>
              </a>

              <a
                href="https://www.google.com/maps/place/Square+Polytechnic+Institute/@24.7006991,89.3994865,38m/data=!3m1!1e3!4m6!3m5!1s0x39fdb30e6ecc90ab:0x4f3db0536e32df08!8m2!3d24.7006875!4d89.3995625!16s%2Fg%2F11hj_f73jt?entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-orange-500 transition-colors"
              >
                <TiLocation className="text-lg" />
                <span>Bogura, Bangladesh</span>
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Follow Us</h3>

            <div className="flex items-center gap-3">
              <Link
                href="#"
                className="w-11 h-11 rounded-full border flex items-center justify-center  hover:text-blue-500 hover:border-blue-600 transition-all duration-300"
              >
                <FaFacebookF />
              </Link>

              <Link
                href="#"
                className="w-11 h-11 rounded-full border flex items-center justify-center  hover:text-blue-500 hover:border-blue-600  transition-all duration-300"
              >
                <FaInstagram />
              </Link>

              <Link
                href="#"
                className="w-11 h-11 rounded-full border flex items-center justify-center  hover:text-blue-500 hover:border-blue-600  transition-all duration-300"
              >
                <FaGithub />
              </Link>

              <Link
                href="#"
                className="w-11 h-11 rounded-full border flex items-center justify-center hover:text-blue-500 hover:border-blue-600  transition-all duration-300"
              >
                <FaLinkedinIn />
              </Link>
            </div>

            <p className="mt-4 text-sm text-default-500">
              Join our growing community of food lovers and discover new recipes
              every day.
            </p>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-10 md:mt-16 rounded-3xl  bg-base-200/40 p-5 md:p-10 text-center">
          <h3 className="text-2xl md:text-3xl font-bold">
            Get New Recipes Weekly 🍲
          </h3>

          <p className="mt-3 text-default-500 max-w-2xl mx-auto">
            Subscribe to receive delicious recipes, cooking tips, and food
            inspiration directly in your inbox.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full sm:w-80"
            />

            <button className="btn bg-orange-500 hover:bg-orange-600 text-white border-none">
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-t-gray-700 mt-12 pt-6 text-center">
          <p className="text-sm text-gray-300 ">
            © {currentYear} ChefWorld. All rights reserved.
          </p>

          <p className="text-sm text-gray-300 mt-1">
            Made with ❤️ for food lovers around the world.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
