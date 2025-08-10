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

      const split = new SplitText(heading, { type: "words" });
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
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="col-span-full mt-[0.5em] hidden w-[14ch] text-[25px] sm:w-[10ch] sm:text-[40.2px] md:text-[55.4px] lg:block lg:text-[68.2px] xl:text-[81px] 2xl:text-[93.8px]"
    >
      <p
        ref={textRef}
        className="font-secondary to-foreground dark:from-foreground bg-gradient-to-b from-[#999999] bg-clip-text font-semibold text-transparent dark:to-[#999999]"
      >
        Join The Exclusive Merch <span className="text-primary">Store</span>
      </p>
    </div>
  );
};

export default TitleLg;
