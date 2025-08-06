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
        .to(".hero-logo-img", { delay: 2, opacity: 1, y: 0 }, "<");

      if (playAnimation) tl.play();
    },
    { scope: containerRef, dependencies: [playAnimation] },
  );

  return (
    <div
      ref={containerRef}
      className="relative mx-auto aspect-[134/117] w-3/4 sm:absolute sm:right-0 sm:bottom-0 sm:aspect-auto sm:h-[95%] sm:w-auto 2xl:h-[90%]"
    >
      {/* 5 logo images */}
      <Image
        src={bitcoin}
        alt="Bitcoin Logo"
        className="hero-bitcoin-img hero-logo-img absolute top-0 right-[20%] my-auto w-[42px] translate-y-[1em] opacity-0 select-none sm:w-[58.5px] md:w-[75px] lg:w-[101.5px] xl:w-[128px] 2xl:w-[154.5px]"
        priority
        onLoad={onImageLoad}
      />
      <Image
        src={fiverr}
        alt="Fiverr Logo"
        className="hero-fiverr-img hero-logo-img absolute top-[10%] right-[56%] w-[42px] translate-y-[1em] rotate-[10deg] opacity-0 select-none sm:w-[58.5px] md:w-[75px] lg:w-[101.5px] xl:w-[128px] 2xl:w-[154.5px]"
        priority
        onLoad={onImageLoad}
      />
      <Image
        src={usd}
        alt="US Dollar Sign"
        className="hero-usd-img hero-logo-img absolute top-[36%] right-[10%] my-auto w-[42px] translate-y-[1em] rotate-[10deg] opacity-0 select-none sm:w-[58.5px] md:w-[75px] lg:w-[101.5px] xl:w-[128px] 2xl:w-[154.5px]"
        priority
        onLoad={onImageLoad}
      />
      <Image
        src={shutterstock}
        alt="Shutterstock Logo"
        className="hero-shutterstock-img hero-logo-img absolute top-[40%] left-[10%] z-[1] my-auto w-[63px] translate-y-[1em] rotate-[10deg] opacity-0 select-none sm:w-[95.25px] md:w-[127.5px] lg:w-[159.75px] xl:w-[192px] 2xl:w-[224.25px]"
        priority
        onLoad={onImageLoad}
      />
      <Image
        src={usdt}
        alt="USDT Logo"
        className="hero-usdt-img hero-logo-img absolute top-[65%] right-[25%] z-[1] my-auto w-[52.5px] translate-y-[1em] rotate-[10deg] opacity-0 select-none sm:w-[79.375px] md:w-[106.25px] lg:w-[133.125px] xl:w-[160px] 2xl:w-[186.875px]"
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
