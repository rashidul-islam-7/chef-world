export const metadata = {
  title: "Sign in | CookWorld",
};

import React from "react";
import SignInClient from "./SignInClient";

const SignInPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-16 dark:bg-gray-900 ">
      <div className="w-full max-w-xl md:rounded-3xl md:border border-gray-200/60  p-6 shadow-2xl backdrop-blur-xl transition-all sm:p-8 mt-20 ">
        <SignInClient />
      </div>
    </div>
  );
};

export default SignInPage;
