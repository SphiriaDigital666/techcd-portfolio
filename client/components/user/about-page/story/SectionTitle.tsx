"use client";

import React, { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { RiArrowRightDownLine } from "react-icons/ri";

import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const SectionTitle: React.FC<{ className?: string }> = ({ className = "" }) => {
  const container = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLParagraphElement | null>(null);

  useGSAP(
    () => {
      const heading = headingRef.current;
      if (!heading) return;

      const split = new SplitText(heading, { type: "chars" });
      split.chars.forEach((e) => {
        e.classList.add("gradient-text");
      });
      const tween = gsap.from(split.chars, {
        opacity: 0,
        y: "0.5em",
        stagger: 0.1,
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
      className={cn(
        "my-[0.2em] flex items-center text-[26px] sm:text-[34px] md:text-[43px] lg:text-[51px] xl:text-[60px] 2xl:text-[68px]",
        className,
      )}
    >
      <h2
        ref={headingRef}
        className="dark:from-foreground to-foreground bg-gradient-to-b from-[#999999] bg-clip-text font-semibold text-transparent uppercase dark:to-[#999999]"
      >
        Our story
      </h2>
      <RiArrowRightDownLine className="text-[1.4em]" />
    </div>
  );
};

export default SectionTitle;
