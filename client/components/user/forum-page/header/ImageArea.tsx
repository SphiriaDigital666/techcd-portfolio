"use client";

import React, { useRef } from "react";
import Image from "next/image";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BsArrowDown } from "react-icons/bs";

import img from "@/public/images/forum-page/header/img.png";

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
    <div
      ref={container}
      className="relative row-start-1 flex h-[202px] items-end lg:col-span-4 lg:row-start-auto lg:h-auto xl:col-span-3"
    >
      <div className="bg-foreground text-background absolute bottom-0 left-0 aspect-square h-[23%] rounded-full lg:h-auto lg:w-[15%]">
        <BsArrowDown className="absolute inset-0 m-auto size-fit text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[25px] 2xl:text-[26px]" />
      </div>
      <Image ref={imgRef} src={img} alt="" className="h-full w-fit lg:h-auto" />
    </div>
  );
};

export default ImageArea;
