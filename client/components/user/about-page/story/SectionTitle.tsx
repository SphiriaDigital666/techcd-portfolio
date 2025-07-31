import React from "react";
import { RiArrowRightDownLine } from "react-icons/ri";

import { cn } from "@/lib/utils";

const SectionTitle: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div
      className={cn(
        "my-[0.2em] flex items-center text-[26px] sm:text-[34px] md:text-[43px] lg:text-[51px] xl:text-[60px] 2xl:text-[68px]",
        className,
      )}
    >
      <h2 className="dark:from-foreground to-foreground bg-gradient-to-b from-[#999999] bg-clip-text font-semibold text-transparent uppercase dark:to-[#999999]">
        Our story
      </h2>
      <RiArrowRightDownLine className="text-[1.4em]" />
    </div>
  );
};

export default SectionTitle;
