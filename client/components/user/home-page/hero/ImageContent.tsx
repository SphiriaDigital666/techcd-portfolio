"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

import { glitchOneClipPaths, glitchOpacityKeyframes } from "@/lib/constants";
import hero from "@/public/images/home-page/hero/hero.png";
import bitcoin from "@/public/images/home-page/hero/bitcoin.svg";

const ImageContent: React.FC<{
  onImageLoad: () => void;
  playAnimation: boolean;
}> = ({ onImageLoad, playAnimation }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap
        .timeline({ paused: true })
        .to(".hero-glitch-img-one", {
          keyframes: {
            clipPath: glitchOneClipPaths,
            opacity: glitchOpacityKeyframes,
          },
          ease: "none",
          duration: 2,
          repeat: -1,
        })
        .to(".hero-bitcoin-img-one", { delay: 2, opacity: 1, y: 0 }, "<")
        .to(".hero-bitcoin-img-two", { opacity: 1, y: 0 }, "<");

      if (playAnimation) tl.play();
    },
    { scope: containerRef, dependencies: [playAnimation] },
  );

  return (
    <div
      ref={containerRef}
      className="relative mx-auto aspect-[134/117] w-3/4 sm:absolute sm:right-0 sm:bottom-0 sm:aspect-auto sm:h-[95%] sm:w-auto 2xl:h-[90%]"
    >
      {/* 2 bitcoin images */}
      <Image
        src={bitcoin}
        alt="Bitcoin Logo"
        className="hero-bitcoin-img hero-bitcoin-img-one absolute top-[10%] right-0 left-0 mx-auto w-[42px] -translate-x-[90%] translate-y-[1em] opacity-0 select-none sm:w-[58.5px] md:w-[75px] lg:w-[101.5px] xl:w-[128px] 2xl:w-[154.5px]"
        priority
        onLoad={onImageLoad}
      />
      <Image
        src={bitcoin}
        alt="Bitcoin Logo"
        className="hero-bitcoin-img hero-bitcoin-img-two absolute top-[36%] right-[10%] my-auto w-[42px] translate-y-[1em] opacity-0 select-none sm:w-[58.5px] md:w-[75px] lg:w-[101.5px] xl:w-[128px] 2xl:w-[154.5px]"
        priority
        onLoad={onImageLoad}
      />

      {/* 2 hero images */}
      <Image
        src={hero}
        alt="Hero"
        className="w-full rotate-y-180 object-cover object-center drop-shadow-[5px_5px_5px_#0000004d] select-none sm:h-full sm:w-auto"
        priority
        onLoad={onImageLoad}
      />
      <Image
        src={hero}
        alt="Hero"
        className="hero-glitch-img-one pointer-events-none absolute inset-0 left-[2%] w-full rotate-y-180 object-cover object-center opacity-0 drop-shadow-[-2px_0_red] select-none sm:h-full sm:w-auto"
        priority
        onLoad={onImageLoad}
      />
    </div>
  );
};

export default ImageContent;
