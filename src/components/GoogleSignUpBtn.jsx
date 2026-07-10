"use client";

import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const GoogleSignUpButton = () => {
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogleSignUp = async () => {
    setGoogleLoading(true)
    setGoogleLoading(false);
  };

  return (
    <button
      type="button"
      onClick={handleGoogleSignUp}
      disabled={googleLoading}
      className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300
        bg-white
        px-4
        py-2
        font-medium
        text-gray-700
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-0.5
        cursor-pointer
        hover:border-gray-400
        hover:bg-gray-100
        hover:shadow-md
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        disabled:cursor-not-allowed
        disabled:opacity-70

        dark:border-gray-700
        dark:bg-gray-900
        dark:text-gray-200
        dark:hover:border-gray-600
        dark:hover:bg-gray-800
      "
    >
      <FcGoogle className="text-2xl" />

      {googleLoading ? (
        <>
          <span>Signing in...</span>
          <AiOutlineLoading3Quarters className="animate-spin text-lg" />
        </>
      ) : (
        <span>Continue with Google</span>
      )}
    </button>
  );
};

export default GoogleSignUpButton;
