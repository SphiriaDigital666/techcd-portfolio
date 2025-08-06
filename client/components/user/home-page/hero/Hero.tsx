"use client";

import React, { useState } from "react";
import Image from "next/image";

import Loader from "./Loader";
import HeroBg from "./HeroBg";
import ImageContent from "./ImageContent";
import TextContent from "./TextContent";
import CTA from "./CTA";
import Banner from "./Banner";

import blur from "@/public/images/home-page/hero/bg-blur.svg";
import blurDark from "@/public/images/home-page/hero/bg-blur-dark.svg";

const TOTAL_IMAGES = 9;

const Hero = () => {
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const handleImageLoad = () => setImagesLoaded((prev) => prev + 1);
  const allImagesLoaded = imagesLoaded === TOTAL_IMAGES;

  return (
    <section className="relative overflow-x-clip">
      {/* Loading screen */}
      <Loader playAnimation={allImagesLoaded} />
      <HeroBg />

      {/* Blur blur (for screens <=639px)*/}
      <div className="to-primary absolute inset-0 bg-gradient-to-br from-transparent from-30% sm:hidden"></div>

      {/* Blur blur (for screens >639px)*/}
      <Image
        src={blur}
        alt=""
        className="absolute inset-0 hidden w-full object-cover object-center sm:block dark:sm:hidden"
        priority
        onLoad={handleImageLoad}
      />
      <Image
        src={blurDark}
        alt=""
        className="absolute inset-0 hidden w-full object-cover object-center dark:sm:block"
        priority
        onLoad={handleImageLoad}
      />

      {/* Container */}
      <div className="px-container relative container mx-auto">
        <div className="relative py-[1em] sm:py-[4em] lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0">
          <ImageContent
            onImageLoad={handleImageLoad}
            playAnimation={allImagesLoaded}
          />
          <TextContent playAnimation={allImagesLoaded} />
          <CTA />
        </div>
      </div>

      <Banner playAnimation={allImagesLoaded} />
    </section>
  );
};

export default Hero;
