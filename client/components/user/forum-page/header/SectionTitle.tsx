import React from "react";

const SectionTitle: React.FC<{ className: string }> = ({ ...props }) => {
  return (
    <div {...props}>
      <p className="bg-primary text-foreground w-fit rounded-full px-[1em] py-[0.4em] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[18px]">
        Forum
      </p>
      <h2 className="dark:from-foreground to-foreground my-[0.2em] bg-gradient-to-b from-[#999999] bg-clip-text text-[26px] font-semibold text-transparent uppercase sm:text-[34px] md:text-[43px] lg:text-[51px] xl:text-[60px] 2xl:text-[68px] dark:to-[#999999]">
        Join the community forum
      </h2>
    </div>
  );
};

export default SectionTitle;
