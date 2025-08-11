"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

import { glitchOneClipPaths, glitchOpacityKeyframes } from "@/lib/constants";
import hero from "@/public/images/home-page/hero/hero.png";
import shutterstock from "@/public/images/home-page/hero/shutterstock.svg";
import fiverr from "@/public/images/home-page/hero/fiverr.svg";
import bitcoin from "@/public/images/home-page/hero/bitcoin.svg";
import usd from "@/public/images/home-page/hero/usd.svg";
import usdt from "@/public/images/home-page/hero/usdt.svg";

const ImageContent: React.FC<{
  onImageLoad: () => void;
  playAnimation: boolean;
}> = ({ onImageLoad, playAnimation }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.set(".logo-image", { opacity: 0, yPercent: 20 });

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
        .to(
          ".logo-image",
          { opacity: 1, yPercent: 0, stagger: 0.1, delay: 2 },
          "<",
        );

      if (playAnimation) tl.play();
    },
    { scope: containerRef, dependencies: [playAnimation] },
  );

  return (
    <div
      ref={containerRef}
      className="relative mx-auto aspect-[134/117] w-3/4 sm:absolute sm:right-0 sm:bottom-0 sm:aspect-auto sm:h-[95%] sm:w-auto 2xl:h-[90%]"
    >
      {/* Logo images */}
      <Image
        src={bitcoin}
        alt="Bitcoin Logo"
        priority
        onLoad={onImageLoad}
        className="logo-image absolute top-[8%] left-[30%] w-[18%] -translate-x-1/2 select-none"
      />
      <Image
        src={usdt}
        alt="USDT Logo"
        priority
        onLoad={onImageLoad}
        className="logo-image absolute top-[30%] left-[30%] w-[12%] -translate-x-1/2 rotate-[10deg] select-none"
      />
      <Image
        src={usd}
        alt="US Dollar Sign"
        priority
        onLoad={onImageLoad}
        className="logo-image absolute top-[35%] left-[80%] w-[18%] -translate-x-1/2 rotate-[10deg] select-none"
      />
      <Image
        src={fiverr}
        alt="Fiverr Logo"
        priority
        onLoad={onImageLoad}
        className="logo-image absolute top-[15%] left-[85%] w-[15%] -translate-x-1/2 rotate-[10deg] select-none"
      />
      <Image
        src={shutterstock}
        alt="Shutterstock Logo"
        priority
        onLoad={onImageLoad}
        className="logo-image absolute top-0 left-[75%] w-[12%] -translate-x-1/2 rotate-[10deg] select-none"
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
