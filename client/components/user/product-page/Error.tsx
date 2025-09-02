import React from "react";
import { VscBracketError } from "react-icons/vsc";

const Error = () => {
  return (
    <div className="bg-foreground/10 border-foreground/30 flex h-[200px] flex-col items-center justify-center gap-[0.3em] rounded-[1em] border p-[1em] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] 2xl:h-[450px]">
      <VscBracketError className="text-[3em]" />
      <p>Unable to load products.</p>
      <p className="mt-[0.5em] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[18px]">
        We’re working on it. Please try again shortly.
      </p>
    </div>
  );
};

export default Error;
