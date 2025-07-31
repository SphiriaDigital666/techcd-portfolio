"use client";

import React from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import tShirt from "@/public/images/home-page/store/t-shirt.png";

const ProductCarousel = () => {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        autoplay={{
          pauseOnMouseEnter: true,
        }}
        modules={[Autoplay]}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <SwiperSlide key={i}>
            <div className="relative mx-auto aspect-square w-3/4 rounded-[1em] bg-[#dfdfdf]/30 p-[1em] text-[12px] backdrop-blur-sm sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[17px] dark:bg-white">
              <div className="text-background font-tertiary flex items-center justify-between font-medium">
                <p>T SHIRT</p>
                <p>$ 30</p>
              </div>

              <Image
                src={tShirt}
                alt="T Shirt"
                className="object-contain"
                fill
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ProductCarousel;
