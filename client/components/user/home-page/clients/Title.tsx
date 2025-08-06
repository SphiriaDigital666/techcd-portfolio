"use client";

import React, { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

const Title = () => {
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
      className="mb-[0.5em] text-[25px] sm:text-[38.75px] md:text-[52.5px] lg:text-[66.25px] xl:text-[80px] 2xl:text-[93.75px]"
    >
      <p className="font-secondary section-title dark:from-foreground font-semibold perspective-distant dark:bg-gradient-to-b dark:to-[#999999] dark:bg-clip-text dark:text-transparent">
        Our Clients
      </p>
    </div>
  );
};

export default Title;
