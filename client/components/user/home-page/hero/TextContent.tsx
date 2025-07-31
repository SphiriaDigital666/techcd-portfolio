"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import TextPlugin from "gsap/TextPlugin";

gsap.registerPlugin(useGSAP, TextPlugin);

const TextContent: React.FC<{ playAnimation: boolean }> = ({
  playAnimation,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap
        .timeline({ defaults: { ease: "power1.in" }, paused: true })
        .to(".hero-sub-text", {
          delay: 1.5,
          opacity: 1,
          x: 0,
        })
        .to(
          "#hero-main-text-line-one",
          {
            text: "Support your ",
            duration: 1,
          },
          "-=0.3",
        )
        .to("#hero-main-text-line-two", {
          text: "favorite ",
          duration: 1,
        })
        .to("#hero-main-text-line-three", {
          text: "creator ?",
          duration: 1,
        });

      if (playAnimation) tl.play();
    },
    { scope: containerRef, dependencies: [playAnimation] },
  );

  return (
    <div
      ref={containerRef}
      className="relative text-center sm:text-left lg:mt-[2.5em]"
    >
      <p className="hero-sub-text relative mt-[1.8em] -translate-x-[1em] text-[13px] opacity-0 sm:mt-0 sm:text-[15.2px] md:text-[17.4px] lg:text-[20.7px] xl:text-[24px] 2xl:text-[27.3px]">
        JOIN THE EXCLUSIVE FAN
      </p>
      <div className="relative mx-auto my-[0.4em] h-[3.35em] w-[12ch] text-[36px] font-semibold uppercase sm:mx-0 sm:text-[41.2px] md:text-[46.4px] lg:text-[54.2px] xl:text-[62px] 2xl:text-[69.8px]">
        <p id="hero-main-text-line-one"></p>
        <p id="hero-main-text-line-two" className="text-primary"></p>
        <p id="hero-main-text-line-three"></p>
      </div>
      <p className="hero-sub-text relative mb-[1em] -translate-x-[1em] text-[15px] opacity-0 sm:mb-[2em] sm:text-[17.2px] md:text-[19.4px] lg:text-[21.7px] xl:text-[24px] 2xl:text-[26.3px]">
        JOIN THE EXCLUSIVE FAN <br /> COUMMUNITY AND GRAB OFFICAL <br /> MERCH
      </p>
    </div>
  );
};

export default TextContent;
