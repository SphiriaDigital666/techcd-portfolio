"use client";

import React from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

type ProductCarouselProps = {
  name: string;
  images: string[];
};

const ProductCarousel: React.FC<ProductCarouselProps> = ({ name, images }) => {
  return (
    <Swiper
      pagination={{ enabled: true, clickable: true, dynamicBullets: true }}
      grabCursor
      modules={[Pagination]}
      speed={1000}
      className="h-full"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <Image
            src={image}
            alt={name}
            fill
            className="size-full rounded-[1em] object-contain"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductCarousel;
