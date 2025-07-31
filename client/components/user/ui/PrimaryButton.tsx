"use client";

import React, { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { IoArrowForward } from "react-icons/io5";

import { cn } from "@/lib/utils";
import classes from "@/styles/primary-button.module.css";

gsap.registerPlugin(useGSAP, SplitText);

type PrimaryButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  iconStyles?: string;
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  className,
  text,
  iconStyles = "",
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      const button = buttonRef.current;
      if (!button) return;

      const buttonTextSplit = new SplitText(".button-text", { type: "chars" });
      const hoverTextSplit = new SplitText(".hover-text", { type: "chars" });

      const getDisplacement = () =>
        Math.floor(Math.random() * 2) > 0 ? "-100%" : "100%";
      const tl = gsap
        .timeline({
          defaults: { ease: "power2.out", stagger: 0.05 },
          paused: true,
        })
        .to(buttonTextSplit.chars, {
          y: getDisplacement,
        })
        .from(
          hoverTextSplit.chars,
          {
            y: getDisplacement,
          },
          "<+0.05",
        );

      const handleMouseEnter = contextSafe(() => tl.play());
      const handleMouseLeave = contextSafe(() => tl.reverse());

      button.addEventListener("mouseenter", handleMouseEnter);
      button.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        button.removeEventListener("mouseenter", handleMouseEnter);
        button.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { scope: buttonRef },
  );

  return (
    <button
      ref={buttonRef}
      className={cn(
        "font-secondary group flex items-center gap-[0.8em] overflow-hidden rounded-full rounded-tl-none border-[0.15em] ps-[1.5em] font-medium uppercase backdrop-blur-sm",
        className,
      )}
      {...props}
    >
      {/* Animated balls */}
      <div
        className={cn(
          "bg-foreground absolute top-0 left-0 size-[2em] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-[0.4em] brightness-125 transition-opacity delay-500 duration-500 ease-in group-hover:opacity-100 group-focus:opacity-100",
          classes["ball-one"],
        )}
      ></div>
      <div
        className={cn(
          "bg-primary absolute top-0 left-0 size-[2em] -translate-x-2/5 -translate-y-2/5 rounded-full opacity-0 blur-[0.4em] brightness-125 transition-opacity delay-500 duration-500 ease-in group-hover:opacity-100 group-focus:opacity-100",
          classes["ball-two"],
        )}
      ></div>

      {/* black bg (visible on hover) */}
      <div className="group-hover:bg-background/60 group-focus:bg-background/60 absolute inset-0 m-[0.2em] rounded-full rounded-tl-none bg-transparent backdrop-blur-sm transition-all duration-500"></div>

      {/* text */}
      <span className="hover-text absolute overflow-hidden">{text}</span>
      <span className="button-text relative overflow-hidden">{text}</span>

      {/* icon */}
      <div
        className={cn(
          "bg-primary text-background group-hover:text-foreground group-focus:text-foreground relative m-[0.3em] size-[2em] rounded-full transition-all duration-500 group-hover:bg-transparent group-focus:bg-transparent",
          iconStyles,
        )}
      >
        <IoArrowForward className="absolute inset-0 m-auto text-[1.5em] group-hover:animate-pulse group-focus:animate-pulse" />
      </div>
    </button>
  );
};

export default PrimaryButton;
