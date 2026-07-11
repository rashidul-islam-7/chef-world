
"use client";

import Link from "next/link";

const JoinCommunity = () => {
  return (
    <section>
      <div>
        <div className="md:pb-10 pb-6 relative overflow-hidden shadow-2xl shadow-orange-500/10 group">
          {/* Background Image with Zoom Effect on Hover */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2000')",
            }}
          />

          {/* Gradient Overlay  */}
          <div className="absolute inset-0 bg-linear-to-tr from-black/85 via-black/75 to-orange-950/40 backdrop-blur-[2px]" />

          {/* Light Glow */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-500/20 rounded-full blur-[100px] pointer-events-none" />

          {/* Content Area */}
          <div className="relative z-10 px-6 py-15 md:px-12 lg:px-24 text-center text-white flex flex-col items-center">
            {/* Tag/Badge */}
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-orange-300 border border-white/10 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              Join Our Community
            </span>

            {/* Heading */}
            <h2 className="mt-4 text-2xl sm:text-3xl lg:text-5xl font-black tracking-tight max-w-4xl md:leading-[1.10]">
              Share Your Favorite Recipes <br className="hidden md:block" />
              <span className="bg-linear-to-r from-orange-400 via-amber-300 to-orange-400 bg-clip-text text-transparent">
                With The World
              </span>
            </h2>

            {/* Subtext */}
            <p className="mt-3 md:mt-5 text-base sm:text-lg text-gray-300 max-w-2xl font-medium leading-relaxed">
              Join thousands of food enthusiasts who create, share, and discover
              amazing recipes every day. Elevate your culinary journey today.
            </p>

            {/* Stats Grid */}
            <div className="flex justify-center items-center flex-wrap gap-8 sm:gap-y-0 my-5 md:my-8 max-w-3xl w-full border-t border-b border-white/10 py-5 sm:divide-x sm:divide-white/10">
              <div className="px-4 transform transition duration-300 hover:scale-105">
                <h3 className="text-3xl lg:text-4xl font-black text-gray-100 tracking-tight">
                  5M+
                </h3>
                <p className="text-sm font-semibold uppercase tracking-wide text-gray-400 mt-2">
                  Food Lovers
                </p>
              </div>

              <div className="px-4 transform transition duration-300 hover:scale-105">
                <h3 className="text-3xl lg:text-4xl font-black text-gray-100 tracking-tight">
                  5K+
                </h3>
                <p className="text-sm font-semibold uppercase tracking-wide text-gray-400 mt-2">
                  Recipes Shared
                </p>
              </div>

              <div className="px-4 transform transition duration-300 hover:scale-105">
                <h3 className="text-3xl lg:text-4xl font-black text-gray-100 tracking-tight">
                  100K+
                </h3>
                <p className="text-sm font-semibold uppercase tracking-wide text-gray-400 mt-2">
                  Recipe Likes
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-14">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-linear-to-r from-orange-500 to-amber-500 text-white font-bold tracking-wide shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-1 hover:brightness-110 active:translate-y-0 transition-all duration-300"
              >
                Get Started Today
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinCommunity;
