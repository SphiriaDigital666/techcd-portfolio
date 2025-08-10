"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

import { glitchOneClipPaths, glitchOpacityKeyframes } from "@/lib/constants";
import hero from "@/public/images/home-page/hero/hero.png";

const ImageContent: React.FC<{
  onImageLoad: () => void;
  playAnimation: boolean;
}> = ({ onImageLoad, playAnimation }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ paused: true }).to(".hero-glitch-img-one", {
        keyframes: {
          clipPath: glitchOneClipPaths,
          opacity: glitchOpacityKeyframes,
        },
        ease: "none",
        duration: 2,
        repeat: -1,
      });
      if (playAnimation) tl.play();
    },
    { scope: containerRef, dependencies: [playAnimation] },
  );

  return (
    <div
      ref={containerRef}
      className="relative mx-auto aspect-[134/117] w-3/4 sm:absolute sm:right-0 sm:bottom-0 sm:aspect-auto sm:h-[95%] sm:w-auto 2xl:h-[90%]"
    >
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
