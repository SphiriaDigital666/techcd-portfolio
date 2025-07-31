import React from "react";
import PricingCheckMark from "../../icons/PricingCheckMark";
import { cn } from "@/lib/utils";

const PricingPlanCard: React.FC<{ colored: boolean }> = ({ colored }) => {
  return (
    <div className="dark:from-primary/10 dark:via-primary/5 dark:to-primary/20 from-foreground/20 via-foreground/10 to-foreground/40 group relative mx-auto max-w-[250px] rounded-[1em] bg-gradient-to-tr p-[1.5em] text-[20px] backdrop-blur-[4px] sm:mx-0 sm:max-w-none sm:text-[27px] md:text-[34px] lg:p-[1em] lg:text-[41px] xl:text-[48px] 2xl:text-[55px]">
      <div className="absolute inset-0 rounded-[1em] opacity-0 shadow-[0_0_0_1px_var(--color-primary)] transition-opacity duration-300 group-hover:opacity-30"></div>
      <div className="via-primary absolute top-0 right-0 left-0 mx-auto h-[0.1em] w-3/5 -translate-y-1/2 bg-gradient-to-r from-transparent to-transparent opacity-0 blur-[3px] transition-opacity duration-300 group-hover:opacity-100"></div>

      <div
        className={cn(
          "border-foreground/20 bg-foreground/10 relative mb-[0.6em] size-[1em] rounded-full border",
          colored && "from-primary to-primary/40 border-none bg-gradient-to-b",
        )}
      >
        <svg
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 m-auto size-4/10"
        >
          <path
            d="M20 10.0002C20 15.5231 15.5228 20.0002 10 20.0002C4.47715 20.0002 0 15.5231 0 10.0002C0 4.4774 4.47715 0.000244141 10 0.000244141C15.5228 0.000244141 20 4.4774 20 10.0002ZM4.5 10.0002C4.5 13.0378 6.96243 15.5002 10 15.5002C13.0376 15.5002 15.5 13.0378 15.5 10.0002C15.5 6.96268 13.0376 4.50024 10 4.50024C6.96243 4.50024 4.5 6.96268 4.5 10.0002Z"
            fill={
              colored ? "var(--color-background)" : "var(--color-foreground)"
            }
          />
        </svg>
      </div>

      <h3 className="relative text-[15px] font-medium uppercase sm:text-[16px] md:text-[17px] lg:text-[18px] xl:text-[20px] 2xl:text-[21px]">
        Basic
      </h3>
      <p className="relative text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[17px]">
        Best for personal use.
      </p>

      <p className="relative mt-[0.6em] mb-[0.6em] font-medium lg:mb-[0.3em]">
        Free
      </p>

      <button className="from-foreground/10 border-foreground/10 hover:bg-primary focus:bg-primary relative w-full rounded-[1em] border bg-gradient-to-b to-transparent py-[1em] text-[12px] font-medium uppercase transition-colors duration-300 sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[17px]">
        Subscribe
      </button>

      <hr className="border-t-foreground/20 my-[0.8em]" />

      <p className="relative text-[12px] font-medium sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[17px]">
        What you will get
      </p>
      <ul className="text-foreground/80 relative mt-[1.5em] space-y-[1em] text-[12px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px] 2xl:text-[15px]">
        <li className="flex items-center gap-[0.3em]">
          <PricingCheckMark className="size-[1.2em]" />
          <p> Employee directory</p>
        </li>

        <li className="flex items-center gap-[0.3em]">
          <PricingCheckMark className="size-[1.2em]" />
          <p> Employee directory</p>
        </li>

        <li className="flex items-center gap-[0.3em]">
          <PricingCheckMark className="size-[1.2em]" />
          <p> Employee directory</p>
        </li>

        <li className="flex items-center gap-[0.3em]">
          <PricingCheckMark className="size-[1.2em]" />
          <p> Employee directory</p>
        </li>

        <li className="flex items-center gap-[0.3em]">
          <PricingCheckMark className="size-[1.2em]" />
          <p> Employee directory</p>
        </li>

        <li className="flex items-center gap-[0.3em]">
          <PricingCheckMark className="size-[1.2em]" />
          <p> Employee directory</p>
        </li>
      </ul>
    </div>
  );
};

export default PricingPlanCard;
