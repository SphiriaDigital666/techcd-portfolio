"use client";

import React, { useRef } from "react";
import Image from "next/image";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GoArrowUpRight } from "react-icons/go";

import img from "@/public/images/collaborate-page/story/story.png";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ImageArea = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useGSAP(
    () => {
      const img = imgRef.current;
      if (!img) return;

      const tween = gsap.from(img, {
        opacity: 0,
        xPercent: 10,
        duration: 1.5,
        transformOrigin: "50% 50%",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          once: true,
        },
      });

      return () => tween.kill();
    },
    { scope: container },
  );

  return (
    <div ref={container} className="relative h-[200px] lg:col-span-5 lg:h-auto">
      <Image
        ref={imgRef}
        src={img}
        alt=""
        className="h-full w-fit lg:h-auto lg:w-full"
      />
      <div className="absolute bottom-[15%] left-0 flex aspect-square h-[30%] items-center justify-center">
        <button className="bg-foreground rounded-full p-[0.5em]">
          <GoArrowUpRight className="text-primary text-[32px] lg:text-[64px] xl:text-[76px] 2xl:text-[92px]" />
        </button>
      </div>
    </div>
  );
};

export default ImageArea;
