"use client";

import React, { useRef } from "react";
import Image from "next/image";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import about from "@/public/images/home-page/about/about.png";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ImageArea = () => {
  const container = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useGSAP(
    () => {
      const img = imgRef.current;
      if (!img) return;

      const tween = gsap.from(img, {
        duration: 1,
        opacity: 0,
        xPercent: -5,
        scrollTrigger: {
          trigger: img,
          start: "50% 80%",
          once: true,
        },
      });

      return () => tween.kill();
    },
    { scope: imgRef },
  );

  return (
    <div
      ref={container}
      className="mx-auto aspect-[25/23] w-4/5 sm:w-3/5 md:w-1/2 lg:relative lg:z-[1] lg:col-span-6 lg:w-full"
    >
      <Image ref={imgRef} src={about} alt="About" className="w-full" />
    </div>
  );
};

export default ImageArea;
