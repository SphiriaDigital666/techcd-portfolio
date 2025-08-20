"use client";

import React, { useRef } from "react";
import Image from "next/image";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import one from "@/public/images/collaborate-page/why/1.png";
import two from "@/public/images/collaborate-page/why/2.png";
import three from "@/public/images/collaborate-page/why/3.png";
import four from "@/public/images/collaborate-page/why/4.png";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const data = [
  {
    id: "001",
    img: one,
    title: "Tech Expertise",
    desc: "Software, web & IT solutions",
  },
  {
    id: "002",
    img: two,
    title: "Global Influence",
    desc: "Worked with Binance, Redbull, AliExpress, XM.com",
  },
  {
    id: "003",
    img: three,
    title: "Marketing Power",
    desc: "Social media campaigns reaching millions",
  },
  {
    id: "004",
    img: four,
    title: "Long-Term Partnerships",
    desc: "Focus on relationships & measurable success",
  },
];

const CardContainer = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = container.current?.querySelectorAll(
        ".why-collaborate-card",
      );
      if (!cards) return;

      const tween = gsap.from(cards, {
        filter: "blur(10px)",
        opacity: 0,
        y: "1em",
        stagger: 0.4,
        transformOrigin: "50% 50%",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          end: "bottom 50%",
          scrub: 1,
        },
      });

      return () => tween.kill();
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="mt-[2em] grid grid-cols-1 gap-[1.5em] sm:grid-cols-2 lg:grid-cols-4"
    >
      {data.map(({ img, desc, id, title }) => (
        <div
          key={id}
          className="why-collaborate-card relative mx-auto flex w-fit flex-col items-center gap-[2em] rounded-[1em] p-[1.5em] text-center text-[13px] sm:text-[15px] md:text-[17px] lg:text-[19px] xl:text-[20px] 2xl:text-[21px]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0"
            viewBox="0 0 288 350"
            // preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="strokeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--foreground)"
                  stopOpacity="0"
                />
                <stop
                  offset="100%"
                  stopColor="var(--foreground)"
                  stopOpacity="1"
                />
              </linearGradient>
            </defs>

            <rect
              width="287"
              height="349"
              x="0"
              y="0"
              rx="12"
              ry="12"
              fill="var(--foreground)"
              fillOpacity={0.05}
              stroke="url(#strokeGradient)"
              strokeWidth={1.5}
              strokeOpacity={0.8}
            />
          </svg>

          <Image
            src={img}
            alt=""
            className="text-primary relative size-[60px] sm:size-[66.25px] md:size-[72.5px] lg:size-[78.75px] xl:size-[81.875px] 2xl:size-[85px]"
          />
          <p className="dark:from-foreground to-foreground relative h-[2.2em] max-w-[13ch] bg-gradient-to-b from-[#999999] bg-clip-text font-semibold text-transparent uppercase dark:to-[#999999]">
            {title}
          </p>
          <p className="relative max-w-[16ch]">{desc}</p>
        </div>
      ))}
    </div>
  );
};

export default CardContainer;
