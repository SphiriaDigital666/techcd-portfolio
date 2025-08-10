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
      className="relative text-[25px] sm:text-[38.75px] md:text-[52.5px] lg:text-[66.25px] xl:text-[80px] 2xl:text-[93.75px]"
    >
      <p ref={textRef} className="font-secondary font-semibold">
        Join The <br /> Exclusive Fan Community
      </p>

      {/* <div className="absolute top-0 left-[7ch] hidden h-[1.3em] sm:flex sm:items-center">
            <button className="bg-primary text-background rounded-full px-[1em] py-[0.3em] font-medium sm:text-[12px] md:text-[14px] lg:text-[17px] xl:text-[20px] 2xl:text-[23px]">
              View More
            </button>
          </div> */}
    </div>
  );
};

export default Title;
