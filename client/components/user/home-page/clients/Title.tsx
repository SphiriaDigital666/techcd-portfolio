"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Title = () => {
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
      className="mb-[0.5em] text-[25px] sm:text-[38.75px] md:text-[52.5px] lg:text-[66.25px] xl:text-[80px] 2xl:text-[93.75px]"
    >
      <p
        ref={textRef}
        className="font-secondary section-title dark:from-foreground font-semibold perspective-distant dark:bg-gradient-to-b dark:to-[#999999] dark:bg-clip-text dark:text-transparent"
      >
        Our Clients
      </p>
    </div>
  );
};

export default Title;
