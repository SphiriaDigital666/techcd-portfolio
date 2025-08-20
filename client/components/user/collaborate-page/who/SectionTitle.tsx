"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import PrimaryButton from "../../ui/PrimaryButton";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const SectionTitle = () => {
  const container = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLParagraphElement | null>(null);

  useGSAP(
    () => {
      const heading = headingRef.current;
      if (!heading) return;

      const split = new SplitText(heading, { type: "words" });
      split.words.forEach((e) => {
        e.classList.add("gradient-text");
      });
      const tween = gsap.from(split.words, {
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
    <div ref={container}>
      <h2
        ref={headingRef}
        className="dark:from-foreground to-foreground bg-gradient-to-b from-[#999999] bg-clip-text text-center text-[26px] font-semibold text-transparent uppercase sm:text-[34px] md:text-[43px] lg:shrink-0 lg:text-[51px] xl:text-[60px] 2xl:text-[68px] dark:to-[#999999]"
      >
        Why Collaborate <br /> With Us
      </h2>
      <PrimaryButton
        text="Start Collaboration"
        iconStyles="bg-foreground"
        className="mx-auto mt-[0.7em] text-[12px] sm:text-[13px] md:text-[15px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]"
      />
    </div>
  );
};

export default SectionTitle;
