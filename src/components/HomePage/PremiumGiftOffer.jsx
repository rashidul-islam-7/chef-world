
"use client";
import { motion } from "framer-motion";

import Link from "next/link";
import { FaCrown, FaUsers, FaGift, FaCheckCircle } from "react-icons/fa";

const PremiumGiftOffer = () => {
  return (
    <section className="py-12   dark:bg-gray-900">
      <div className="w-full md:max-w-7xl mx-auto sm:px-8 lg:px-16">
        {/* MAIN CARD */}
        <div className="relative overflow-hidden rounded-2xl md:shadow-x dark:bg-gray-800">
          {/* TOP COLOR BAR */}
          <div className="h-2 w-full bg-linear-to-r from-purple-500 via-indigo-500 to-blue-500 " />

          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* LEFT CONTENT */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              {/* Badge */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                  <FaCrown className="text-white" />
                </div>

                <span className="text-sm font-medium bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                  Premium Special Offer
                </span>
              </div>

              {/* Title */}
              <h2 className="mt-5 text-3xl md:text-4xl font-bold leading-tight text-gray-800 dark:text-gray-100">
                Buy Premium & Gift 3 Friends 1 Month Free Access
              </h2>

              {/* Description */}
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                Upgrade your account and unlock premium features for yourself,
                plus share 1-month free premium access with 3 friends.
              </p>

              {/* FEATURES */}
              <ul className="mt-4 space-y-3 text-gray-400">
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" />
                  Unlimited recipe uploads
                </li>

                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" />
                  Premium badge on profile
                </li>

                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" />3 friends get 1
                  month free premium
                </li>

                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" />
                  Priority support & visibility
                </li>
              </ul>

              {/* CTA */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <form action="/api/subscription" method="POST">
                  <button
                    type="submit"
                    className="w-full md:w-fit cursor-pointer flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
                  >
                    <FaGift />
                    Upgrade Now
                  </button>
                </form>

                <Link
                  href="/dashboard"
                  className="flex items-center justify-center px-6 py-3 rounded-xl border font-medium dark:hover:bg-gray-700 hover:bg-gray-300 transition"
                >
                  Start Sharing
                </Link>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className=" p-6 md:p-12 flex items-center">
              <div className="w-full rounded-2xl shadow-md p-5 md:p-8 border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
                {/* Header */}
                <div className="flex items-center gap-2 text-lg font-bold">
                  <FaUsers className="text-indigo-600" />
                  Referral Rewards
                </div>

                <p className="text-sm mt-2">
                  Invite friends & unlock benefits together
                </p>

                {/* STEPS */}
                <div className="mt-8 space-y-5">
                  <div className="  flex justify-between items-center">
                    <span className="text-gray-400">Buy Premium</span>
                    <span className="text-green-600 font-medium">Active</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Invite 1 Friend</span>
                    <span className="text-indigo-600 font-medium">
                      Reward +
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Invite 3 Friends</span>
                    <span className="text-purple-600 font-bold">
                      1 Month Free
                    </span>
                  </div>
                </div>

                {/* PROGRESS BAR */}
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full w-1/3" />
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Progress: 1 / 3 invites
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default PremiumGiftOffer;
