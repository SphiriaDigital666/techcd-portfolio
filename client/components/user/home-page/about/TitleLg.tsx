"use client";

import React, { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

const TitleLg = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const text = new SplitText(".section-title", { type: "chars" });

      // IMPORTANT
      text.chars.forEach((char) => {
        char.className =
          "bg-gradient-to-b from-[#999999] to-foreground dark:from-foreground dark:to-[#999999] bg-clip-text text-transparent inline-block";
      });

      gsap.from(text.chars, {
        opacity: 0,
        rotationY: -90,
        stagger: 0.1,
        x: "-50%",
        scrollTrigger: {
          trigger: ".section-title",
          start: "top 80%",
        },
      });
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="mb-[0.2em] hidden w-[120%] text-[25px] sm:text-[38.75px] md:text-[52.5px] lg:flex lg:items-center lg:gap-[0.1em] lg:text-[66.25px] xl:mb-[0.6em] xl:text-[80px] 2xl:text-[93.75px]"
    >
      <p className="font-secondary section-title to-foreground dark:from-foreground relative z-[1] shrink-0 bg-gradient-to-b from-[#999999] bg-clip-text font-semibold text-transparent perspective-distant dark:to-[#999999]">
        About Me
      </p>
      <hr className="border-t-foreground mt-[0.15em] w-full" />
    </div>
  );
};

export default TitleLg;
