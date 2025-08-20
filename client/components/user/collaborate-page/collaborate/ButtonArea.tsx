"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const ButtonArea = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useGSAP(
    () => {
      const cn = containerRef.current;
      const btn = buttonRef.current;
      if (!cn || !btn) return;

      const tween = gsap.from(btn, {
        opacity: 0.1,
        filter: "blur(2px)",
        transformOrigin: "50% 50%",
        scrollTrigger: {
          trigger: cn,
          start: "top 90%",
        },
      });

      return () => tween.kill();
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="flex justify-center">
      <button
        ref={buttonRef}
        className="bg-foreground/20 hover:bg-foreground/30 w-fit rounded-full px-[2em] py-[0.5em] text-[16px] font-medium transition-all sm:text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] 2xl:text-[36px]"
      >
        Collaborate Now
      </button>
    </div>
  );
};

export default ButtonArea;
