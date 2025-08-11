"use client";

import React, { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const forumJoinSteps = [
  {
    title: "01",
    desc: "Click Enter Forum",
  },
  {
    title: "02",
    desc: "Register or Login",
  },
  {
    title: "03",
    desc: "Choose a Subscription Tier",
  },
  {
    title: "04",
    desc: "Start engaging!",
  },
];

const Steps = () => {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const tween = gsap.from(".forum-steps", {
        opacity: 0,
        YPercent: 10,
        filter: "blur(10px)",
        transformOrigin: "50% 50%",
        stagger: 0.2,
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          end: "bottom 60%",
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
      className="grid grid-cols-2 gap-[1.5em] lg:grid-cols-4"
    >
      {forumJoinSteps.map(({ desc, title }, i) => (
        <div key={title} className="forum-steps relative pe-[1.5em]">
          {i < 3 && (
            <div className="via-foreground absolute top-0 right-0 bottom-0 hidden h-full w-[1px] bg-gradient-to-b from-transparent to-transparent lg:block"></div>
          )}

          <p className="text-primary mb-[0.2em] text-[26px] font-semibold sm:text-[34px] md:text-[43px] lg:text-[51px] xl:text-[60px] 2xl:text-[68px]">
            {title}.
          </p>
          <p className="text-[14px] sm:text-[16px] md:text-[19px] lg:text-[21px] xl:text-[24px] 2xl:text-[26px]">
            {desc}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Steps;
