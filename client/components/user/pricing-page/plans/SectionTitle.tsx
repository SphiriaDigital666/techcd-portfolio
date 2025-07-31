import React from "react";

const SectionTitle = () => {
  return (
    <>
      <h2 className="dark:from-foreground to-foreground my-[0.2em] bg-gradient-to-b from-[#999999] bg-clip-text text-center text-[26px] font-semibold text-transparent uppercase sm:text-[34px] md:text-[43px] lg:text-[51px] xl:text-[60px] 2xl:text-[68px] dark:to-[#999999]">
        Compare all plans
      </h2>
      <p className="mx-auto mb-[4em] w-[36ch] text-center text-[12px] uppercase sm:text-[13px] md:text-[15px] lg:w-[53ch] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
        Learn more about each plan
      </p>
    </>
  );
};

export default SectionTitle;
