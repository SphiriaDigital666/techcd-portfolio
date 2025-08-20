"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const TextReveal = () => {
  const container = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLParagraphElement | null>(null);

  useGSAP(
    () => {
      const trigger = document.querySelector(
        "#collaborate-page-call-to-action",
      );
      const heading = headingRef.current;
      if (!trigger || !heading) return;

      const lineSplit = new SplitText(heading, { type: "words" });
      const tween = gsap.from(lineSplit.words, {
        opacity: 0.1,
        filter: "blur(2px)",
        stagger: 0.1,
        transformOrigin: "50% 50%",
        scrollTrigger: {
          trigger: trigger,
          start: "top 90%",
          end: "top 50%",
          scrub: 1,
        },
      });

      return () => tween.kill();
    },
    { scope: headingRef },
  );

  return (
    <div ref={container}>
      <p
        ref={headingRef}
        className="text-foreground/80 max-w-[28ch] text-[20px] font-semibold sm:text-[27px] md:text-[34px] lg:text-[41px] xl:text-[48px] 2xl:text-[55px]"
      >
        Let’s Create Something Extraordinary Together
      </p>
    </div>
  );
};

export default TextReveal;
