"use client";

import React, { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { FaFacebookF, FaYoutube, FaTiktok, FaInstagram } from "react-icons/fa";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const SocialLinks = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const links = container.current?.querySelectorAll("button");
      if (!links) return;

      const tween = gsap.from(links, {
        opacity: 0,
        xPercent: -50,
        stagger: 0.2,
        transformOrigin: "50% 50%",
        scrollTrigger: {
          trigger: container.current,
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
      className="mt-[0.5em] flex justify-center gap-[1em] lg:justify-normal"
    >
      <button className="rounded-full border p-[0.5em] opacity-80 hover:opacity-100">
        <FaFacebookF />
      </button>

      <button className="rounded-full border p-[0.5em] opacity-80 hover:opacity-100">
        <FaYoutube />
      </button>

      <button className="rounded-full border p-[0.5em] opacity-80 hover:opacity-100">
        <FaTiktok />
      </button>

      <button className="rounded-full border p-[0.5em] opacity-80 hover:opacity-100">
        <FaInstagram />
      </button>
    </div>
  );
};

export default SocialLinks;
