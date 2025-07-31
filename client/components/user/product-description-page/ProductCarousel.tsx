"use client";

import React from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

type ProductCarouselProps = {
  name: string;
  images: string[];
};

const ProductCarousel: React.FC<ProductCarouselProps> = ({ name, images }) => {
  return (
    <Swiper navigation={true} modules={[Navigation]} className="h-full">
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <Image
            src={image}
            alt={name}
            fill
            className="size-full object-contain"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductCarousel;
