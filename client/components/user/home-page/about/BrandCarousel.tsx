"use client";

import React, { Fragment, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

import { cn } from "@/lib/utils";
import { brandCarouselData } from "@/lib/constants";

const BrandCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from("#brand-carousel", {
        xPercent: -50,
        duration: 30,
        ease: "none",
        repeat: -1,
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="relative z-[1] overflow-clip">
      {/* Top line */}
      <div className="via-foreground/50 h-px bg-gradient-to-r from-transparent to-transparent"></div>

      {/* Carousel */}
      <div
        id="brand-carousel"
        className="my-[2%] grid w-[400%] grid-cols-12 sm:w-[300%] lg:w-[200%]"
      >
        {Array.from({ length: 2 }).map((_, i) => (
          <Fragment key={i}>
            {brandCarouselData.map(({ id, src, alt }) => (
              <div
                key={id}
                tabIndex={-1}
                className={cn(
                  "flex h-[50px] items-center justify-center opacity-80 transition-opacity duration-300 hover:opacity-100 focus:opacity-100 sm:h-[62.5px] md:h-[75px] lg:h-[87.5px] xl:h-[93.8px] 2xl:h-[100px]",
                  id === "005" && "dark:hidden",
                  id === "006" && "hidden dark:block",
                )}
              >
                <Image
                  src={src}
                  alt={alt}
                  className="size-full object-contain"
                />
              </div>
            ))}
          </Fragment>
        ))}
      </div>

      {/* Bottom line */}
      <div className="via-foreground/50 h-px bg-gradient-to-r from-transparent to-transparent"></div>
    </div>
  );
};

export default BrandCarousel;
