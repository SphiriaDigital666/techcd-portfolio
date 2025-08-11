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
      const trigger = document.querySelector("#about-page-header");
      const heading = headingRef.current;
      if (!trigger || !heading) return;

      const lineSplit = new SplitText(heading, { type: "words" });
      const tween = gsap.from(lineSplit.words, {
        opacity: 0.2,
        filter: "blur(2px)",
        stagger: 0.1,
        transformOrigin: "50% 50%",
        scrollTrigger: {
          trigger: trigger,
          start: "top top",
          end: "bottom 20%",
          scrub: 3,
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
        className="mx-auto mt-[1.5em] mb-[2em] max-w-[40ch] text-center text-[14px] sm:text-[20px] md:text-[27px] lg:text-[33px] xl:text-[40px] 2xl:text-[46px]"
      >
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry&apos;s standard dummy text
        ever since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </p>
    </div>
  );
};

export default TextReveal;
