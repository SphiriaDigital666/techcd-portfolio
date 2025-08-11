"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const SectionTitle = () => {
  const headingRef = useRef<HTMLParagraphElement | null>(null);

  useGSAP(
    () => {
      const heading = headingRef.current;
      if (!heading) return;

      const lineSplit = new SplitText(heading, { type: "words" });
      const tween = gsap.from(lineSplit.words, {
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
    <>
      <h2
        ref={headingRef}
        className="dark:from-foreground to-foreground my-[0.2em] bg-gradient-to-b from-[#999999] bg-clip-text text-center text-[26px] font-semibold text-transparent uppercase sm:text-[34px] md:text-[43px] lg:text-[51px] xl:text-[60px] 2xl:text-[68px] dark:to-[#999999]"
      >
        Compare all plans
      </h2>
      <p className="mx-auto mb-[4em] w-[36ch] text-center text-[12px] uppercase sm:text-[13px] md:text-[15px] lg:w-[53ch] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
        Learn more about each plan
      </p>
    </>
  );
};

export default SectionTitle;
