"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { AiFillLike } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";

const PopularRecipesSlide = ({ recipes }) => {
  return (
    <div>
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: ".popular-prev",
          nextEl: ".popular-next",
        }}
        slidesPerGroup={1}
        spaceBetween={24}
        speed={800}
        loop={true}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
      >
        {recipes.map((recipe, index) => (
          <SwiperSlide key={recipe._id}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              className="group border border-gray-400 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 mb-20"
            >
              {/* Image */}
              <div className="overflow-hidden">
                <Image
                  src={recipe.recipeImage}
                  alt={recipe.recipeName}
                  width={20}
                  height={20}
                  className="h-32 w-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-xl font-bold line-clamp-1">
                  {recipe.recipeName}
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  By {recipe.authorName}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-red-500">
                    <AiFillLike />
                    <span className="font-semibold">
                      {recipe.likesCount.toLocaleString()}
                    </span>
                  </div>

                  <Link href={`/recipes/${recipe._id}`}>
                    <button className="cursor-pointer text-orange-500 font-medium hover:text-orange-700 transition">
                      View →
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PopularRecipesSlide;
