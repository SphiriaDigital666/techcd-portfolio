"use client";

import React, { useRef } from "react";
import Image from "next/image";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import img from "@/public/images/about-page/story/img.png";

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
    <div ref={container} className="h-[200px] lg:col-span-4 lg:h-auto">
      <Image
        ref={imgRef}
        src={img}
        alt=""
        className="h-full w-fit lg:h-auto lg:w-full"
      />
    </div>
  );
};

export default ImageArea;
