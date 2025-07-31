import React from "react";
import { cn } from "@/lib/utils";
import { rayClasses } from "@/lib/constants";

const GodRays = () => {
  return (
    <div className="absolute inset-0 overflow-clip">
      <div className="flex size-full translate-x-[5%]">
        {rayClasses.map((e, i) => (
          <div
            key={i}
            className={cn(
              "origin-top-right rotate-[25deg] bg-gradient-to-b from-[#028EFC]/40 to-transparent",
              e,
            )}
          ></div>
        ))}
      </div>

      <div className="absolute inset-0 backdrop-blur-[40px]"></div>
    </div>
  );
};

export default GodRays;
