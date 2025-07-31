"use client";

import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import PricingPlanCard from "./PricingPlanCard";

const PricingCarousel = () => {
  return (
    <>
      <Swiper
        autoplay={{
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        modules={[Autoplay, Pagination]}
        pagination
        slidesPerView={1}
        spaceBetween={0}
        speed={1000}
      >
        {Array.from({ length: 5 }).map((_, i) => {
          const even = i % 2 === 1;

          return (
            <SwiperSlide key={i}>
              <div className="p-[15px] pb-[50px]">
                <PricingPlanCard colored={even} />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default PricingCarousel;
