"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const TextCards = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cn = container.current;
      if (!cn) return;

      gsap.from(".text-card", {
        duration: 1,
        opacity: 0,
        xPercent: -5,
        filter: "blur(10px)",
        stagger: 0.2,
        scrollTrigger: {
          trigger: cn,
          start: "top 80%",
          end: "bottom 80%",
          scrub: 1,
        },
      });
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="mt-[1em] grid grid-cols-1 gap-[1.5em] lg:grid-cols-2"
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="bg-foreground/10 text-card border-foreground/20 rounded-[1em] border px-[1.5em] py-[1em] text-[13px] sm:text-[15px] md:text-[17px] lg:text-[19px] xl:text-[20px] 2xl:text-[21px]"
        >
          <div className="flex items-center gap-[0.5em]">
            <div className="size-[2em] rounded-full bg-[#D9D9D9]"></div>
            <p className="text-[1.1em]">Lorem Ipsum</p>
          </div>
          <p className="mt-[0.5em] text-[0.9em] font-light">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s,
          </p>
        </div>
      ))}
    </div>
  );
};

export default TextCards;
