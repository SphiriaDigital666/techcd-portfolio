"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const TitleLg = () => {
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);

  useGSAP(
    () => {
      const heading = textRef.current;
      if (!heading) return;

      const split = new SplitText(heading, { type: "chars" });
      const tween = gsap.from(split.chars, {
        opacity: 0,
        y: "0.5em",
        stagger: 0.2,
        transformOrigin: "50% 50%",
        scrollTrigger: {
          trigger: heading,
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
      className="mb-[0.2em] hidden w-[120%] text-[25px] sm:text-[38.75px] md:text-[52.5px] lg:flex lg:items-center lg:gap-[0.1em] lg:text-[66.25px] xl:mb-[0.6em] xl:text-[80px] 2xl:text-[93.75px]"
    >
      <p
        ref={textRef}
        className="font-secondary section-title to-foreground dark:from-foreground relative z-[1] shrink-0 bg-gradient-to-b from-[#999999] bg-clip-text font-semibold text-transparent perspective-distant dark:to-[#999999]"
      >
        About Me
      </p>
      <hr className="border-t-foreground mt-[0.15em] w-full" />
    </div>
  );
};

export default TitleLg;
