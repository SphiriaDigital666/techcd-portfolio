import React from "react";

import PrimaryButton from "../../ui/PrimaryButton";
import classes from "@/styles/home-page/hero.module.css";
import { cn } from "@/lib/utils";

const CTA = () => {
  return (
    <div className="relative flex justify-center gap-[1.5em] text-[12px] sm:justify-start sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[17px]">
      <PrimaryButton text="JOIN THE FORUM" />
      <button className="font-secondary group relative rounded-full border-[0.15em] px-[2em] font-medium">
        <div
          className={cn(
            "absolute inset-0 m-[4px] rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus:opacity-100",
            classes.cta,
          )}
        ></div>
        <span className="group-hover:text-background group-focus:text-background mix-blend-overlays text-foreground relative transition-colors duration-300">
          SHOP NOW
        </span>
      </button>
    </div>
  );
};

export default CTA;
