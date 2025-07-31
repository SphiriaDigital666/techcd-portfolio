"use client";

import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Loader: React.FC<{
  playAnimation: boolean;
}> = ({ playAnimation }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useGSAP(
    () => {
      document.body.style.overflow = "hidden";

      if (playAnimation && containerRef.current) {
        document.body.style.overflow = "visible";

        const tl = gsap.timeline({
          onComplete: () => {
            setIsVisible(false);
          },
        });

        tl.to(containerRef.current, {
          keyframes: {
            "20%": {
              borderBottomLeftRadius: "3em",
              borderBottomRightRadius: "3em",
            },
            "100%": { yPercent: -100 },
          },
          duration: 2,
          ease: "power1.in",
        }).to(
          "#hero-loader-text",
          {
            duration: 2,
            ease: "power1.in",
            scale: 0,
          },
          "<",
        );
      }
    },
    { scope: containerRef, dependencies: [playAnimation] },
  );

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="from-background dark:to-background fixed inset-0 z-[100] flex h-screen flex-col items-center justify-center bg-gradient-to-br to-[#0A2A4A] text-white dark:from-[#0A2A4A]"
    >
      <p
        id="hero-loader-text"
        className="animate-pulse text-[2em] tracking-wider uppercase"
      >
        Loading...
      </p>
    </div>
  );
};

export default Loader;
