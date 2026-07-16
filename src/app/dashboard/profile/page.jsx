"use client";

import { useSessionContext } from "@/components/Provider/SessionProvider";
import { authClient } from "@/lib/auth-client";
import { useState, useEffect } from "react";
import { FaCrown, FaCheckCircle, FaCamera, FaChessQueen } from "react-icons/fa";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const session = useSessionContext();
  const isPremium = session?.user?.isPremium;

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setImage(user.image || "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await authClient.updateUser({
      name,
      image,
    });

    if (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
      return;
    }
    toast.success("Profile Updated Successfully");
  };

  return (
    <section className="space-y-8 ">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold dark:text-gray-100">My Profile</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-200">
          Manage your account information and premium membership.
        </p>
      </div>

      {/* Top Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <div className="rounded-2xl border dark:text-white border-gray-200  p-6 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <img
                src={image || "https://placehold.co/200x200"}
                alt="profile"
                className="h-28 w-28 rounded-full border-4 border-orange-100 object-cover"
              />
              {isPremium && (
                <span className="absolute top-0 right-0 text-yellow-400 text-3xl">
                  <FaChessQueen />
                </span>
              )}
            </div>

            <h2 className="mt-4 text-xl font-bold">
              {name || "Anonymous User"}
            </h2>
            <p className="text-sm text-gray-500">{user?.email}</p>

            {isPremium ? (
              <span className="mt-4 flex items-center gap-2 rounded-full bg-yellow-100/30 shadow px-4 py-1.5 text-sm font-semibold">
                <FaCrown className="mb-0.5 text-yellow-400" />
                Premium Member
              </span>
            ) : (
              <span className="mt-4 flex items-center gap-2 rounded-full bg-gray-100 border border-gray-200 shadow px-4 py-1.5 text-sm font-medium text-gray-600">
                <FaCheckCircle className="text-gray-400 dark:text-gray-100" />
                Free Member
              </span>
            )}
          </div>
        </div>

        {/* Update Form */}
        <div className="lg:col-span-2 rounded-3xl border border-gray-200 dark:text-white p-6 shadow-sm">
          <h3 className="mb-6 text-xl font-bold">Update Profile</h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block font-medium">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Profile Image URL
              </label>
              <div className="relative">
                <FaCamera className="absolute left-4 top-4 text-gray-400" />
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="rounded-xl bg-orange-500 px-6 py-3 font-medium text-white transition hover:bg-orange-600"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>

      {/* Premium Section */}
      {!isPremium && (
        <div className="overflow-hidden rounded-3xl bg-linear-to-r from-orange-500 to-red-500 p-8 text-white">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="flex items-center gap-3">
                <FaCrown className="text-3xl" />
                <h2 className="text-3xl font-bold">Upgrade To Premium</h2>
              </div>
              <p className="mt-4 text-orange-50">
                Unlock premium features and enjoy unlimited recipe sharing on
                CookWorld.
              </p>
              <form action={"/api/subscription"} method="POST">
                <button
                  type="submit"
                  className="cursor-pointer mt-6 rounded-xl bg-white px-6 py-3 font-semibold text-orange-600 transition hover:bg-orange-100"
                >
                  Buy Premium
                </button>
              </form>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <FaCheckCircle className="text-2xl" />
                <h3 className="mt-3 font-semibold">Premium Badge</h3>
                <p className="mt-1 text-sm text-orange-100">
                  Stand out with a premium profile badge.
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <FaCheckCircle className="text-2xl" />
                <h3 className="mt-3 font-semibold">Unlimited Recipes</h3>
                <p className="mt-1 text-sm text-orange-100">
                  Add unlimited recipes without limits.
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm sm:col-span-2">
                <FaCheckCircle className="text-2xl" />
                <h3 className="mt-3 font-semibold">Premium Community Access</h3>
                <p className="mt-1 text-sm text-orange-100">
                  Get early access to new features and premium benefits.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProfilePage;
