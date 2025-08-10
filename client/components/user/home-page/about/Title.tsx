"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Title = () => {
  const container = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLParagraphElement | null>(null);

  useGSAP(
    () => {
      const heading = headingRef.current;
      if (!heading) return;

      const lineSplit = new SplitText(heading, { type: "chars" });
      const tween = gsap.from(lineSplit.chars, {
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
    { scope: headingRef },
  );

  return (
    <div
      ref={container}
      className="flex items-center gap-[0.1em] text-[25px] sm:text-[38.75px] md:text-[52.5px] lg:hidden lg:text-[66.25px] xl:text-[80px] 2xl:text-[93.75px]"
    >
      <p
        ref={headingRef}
        className="font-secondary text-foreground dark:from-foreground shrink-0 font-semibold perspective-distant dark:bg-gradient-to-b dark:to-[#999999] dark:bg-clip-text dark:text-transparent"
      >
        About Me
      </p>
      <hr className="border-t-foreground mt-[0.15em] w-full" />
    </div>
  );
};

export default Title;
