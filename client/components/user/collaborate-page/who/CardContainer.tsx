"use client";

import React, { useRef } from "react";
import Image from "next/image";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import one from "@/public/images/collaborate-page/who/1.png";
import two from "@/public/images/collaborate-page/who/2.png";
import three from "@/public/images/collaborate-page/who/3.png";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const data = [
  {
    id: "001",
    img: one,
    title: "Individuals",
    desc: "IT support & promotions",
  },
  {
    id: "002",
    img: two,
    title: "Startups & Businesses",
    desc: "Reliable software & web solutions",
  },
  {
    id: "003",
    img: three,
    title: "Global Brands",
    desc: "Expand influence in Sri Lanka & beyond",
  },
];

const CardContainer = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = container.current?.querySelectorAll(
        ".who-can-collaborate-card",
      );
      if (!cards) return;

      const tween = gsap.from(cards, {
        filter: "blur(10px)",
        opacity: 0,
        scale: 0.8,
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
      className="mt-[2em] grid grid-cols-1 gap-[1.5em] lg:grid-cols-3"
    >
      {data.map(({ img, desc, id, title }) => (
        <div
          key={id}
          className="who-can-collaborate-card bg-background relative flex flex-col items-center gap-[2em] rounded-[1em] p-[1em] text-center text-[13px] transition-colors duration-500 sm:text-[15px] md:text-[17px] lg:text-[19px] xl:text-[20px] 2xl:text-[21px]"
        >
          <Image
            src={img}
            alt=""
            className="size-[60px] mix-blend-difference sm:size-[66.25px] md:size-[72.5px] lg:size-[78.75px] xl:size-[81.875px] 2xl:size-[85px]"
          />
          <p className="text-primary h-[2.2em] max-w-[13ch] font-semibold uppercase">
            {title}
          </p>
          <p className="max-w-[16ch]">{desc}</p>
        </div>
      ))}
    </div>
  );
};

export default CardContainer;
