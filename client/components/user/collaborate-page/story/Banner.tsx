"use client";

import React, { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { BsArrowDown } from "react-icons/bs";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const Banner = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cn = container.current;
      if (!cn) return;

      const tween = gsap.from(cn, {
        opacity: 0,
        yPercent: 10,
        stagger: 0.2,
        transformOrigin: "50% 50%",
        scrollTrigger: {
          trigger: cn,
          start: "top 70%",
          once: true,
        },
      });

      return () => tween.kill();
    },
    { scope: container },
  );

  return (
    <div ref={container} className="relative mt-[3em]">
      <div className="absolute bottom-[0.9%] left-[0.1%] w-4/5 max-w-[32ch] rounded-tr-[7px] rounded-bl-[7px] bg-gradient-to-b from-[#0084F0] to-[#004C8A] p-[1.5em] text-[13px] sm:rounded-tr-[10px] sm:rounded-bl-[10px] sm:text-[15px] md:rounded-tr-[13px] md:rounded-bl-[13px] md:text-[17px] lg:col-span-6 lg:rounded-tr-[16px] lg:rounded-bl-[16px] lg:text-[19px] xl:rounded-tr-[18px] xl:rounded-bl-[18px] xl:text-[20px] 2xl:rounded-tr-[20px] 2xl:rounded-bl-[20px] 2xl:text-[21px]">
        <p className="mb-[0.2em] font-medium">
          Lorem Ipsum is simply dummy text of the printing
        </p>
        <p className="text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[17px]">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      </div>

      <div className="absolute top-0 right-0 aspect-square w-[9.3%]">
        <div className="bg-foreground text-background absolute inset-0 m-auto aspect-square w-[70%] rounded-full">
          <BsArrowDown className="absolute inset-0 m-auto size-fit text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[25px] 2xl:text-[30px]" />
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 502 164"
        className="w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <clipPath id="about-page-clip-path">
            <path
              d="M 8.687 1 L 447.522 1 C 451.761 1 455.21 4.449 455.21 8.687 L 455.21 28.24 C 455.21 38.374 463.429 46.608 473.578 46.608 L 493.313 46.608 C 497.567 46.608 501 50.041 501 54.295 L 501 154.336 C 501 158.583 497.567 162.024 493.313 162.024 L 8.687 162.024 C 4.434 162.024 1 158.583 1 154.336 L 1 8.687 C 1 4.449 4.434 1 8.687 1 Z"
              strokeWidth={0.5}
              stroke="var(--foreground)"
            ></path>
          </clipPath>
        </defs>

        <image
          href="/images/about-page/story/img-two.jpg"
          clipPath="url(#about-page-clip-path)"
          preserveAspectRatio="xMidYMid meet"
          x="0"
          y="0"
          width="100%"
          height="100%"
        />

        <path
          d="M 8.687 1 L 447.522 1 C 451.761 1 455.21 4.449 455.21 8.687 L 455.21 28.24 C 455.21 38.374 463.429 46.608 473.578 46.608 L 493.313 46.608 C 497.567 46.608 501 50.041 501 54.295 L 501 154.336 C 501 158.583 497.567 162.024 493.313 162.024 L 8.687 162.024 C 4.434 162.024 1 158.583 1 154.336 L 1 8.687 C 1 4.449 4.434 1 8.687 1 Z"
          strokeWidth={0.5}
          stroke="var(--foreground)"
          fill="none"
        ></path>
      </svg>
    </div>
  );
};

export default Banner;
