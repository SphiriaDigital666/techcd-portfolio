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
      <div className="border-primary/30 bg-foreground/10 mx-auto w-fit rounded-full border text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[18px]">
        <p className="dark:from-foreground to-foreground bg-gradient-to-b from-[#999999] bg-clip-text px-[1em] py-[0.4em] text-transparent dark:to-[#999999]">
          Bring your business to the best scale
        </p>
      </div>
      <h2
        ref={headingRef}
        className="dark:from-foreground to-foreground my-[0.2em] bg-gradient-to-b from-[#999999] bg-clip-text text-center text-[26px] font-semibold text-transparent uppercase sm:text-[34px] md:text-[43px] lg:text-[51px] xl:text-[60px] 2xl:text-[68px] dark:to-[#999999]"
      >
        Discover Products <br /> With the Best Pricing
      </h2>
      <p className="mx-auto w-[36ch] text-center text-[12px] uppercase sm:text-[13px] md:text-[15px] lg:w-[53ch] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
        Select from best plan, ensuring a perfect match. Need more or less?
        Customize your subscription for a seamless fit!
      </p>
    </>
  );
};

export default SectionTitle;
