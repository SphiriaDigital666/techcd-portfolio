import React from "react";

import Title from "./Title";
import PrimaryButton from "../../ui/PrimaryButton";
import Messages from "./Messages";

const Community = () => {
  return (
    <section className="relative overflow-x-clip py-[3em]">
      {/* Leaklights (for screens <1024px) */}
      <div className="bg-primary absolute top-0 left-0 aspect-square w-2/5 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[50px] lg:hidden"></div>
      <div className="absolute right-0 bottom-0 h-4/5 w-3/5 translate-x-1/2 translate-y-1/12 rounded-full bg-[#028EFC]/60 blur-[100px] lg:hidden"></div>

      {/* Leaklight (for screens >=1024px) */}
      <div className="absolute top-0 right-0 hidden aspect-square w-3/5 translate-x-1/2 -translate-y-1/12 rounded-full bg-[#028EFC]/60 blur-[100px] lg:block"></div>

      <div className="px-container relative container mx-auto">
        {/* Title area */}
        <Title />

        {/* Button area */}
        <div className="mt-[1em] flex flex-col gap-[1em] text-[16px] sm:flex-row sm:items-center sm:text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] 2xl:text-[36px]">
          <p>JOIN THE EXCLUSIVE FAN</p>
          <PrimaryButton
            text="MORE NOW"
            className="w-fit gap-[1.5em] ps-[3em] text-[14px] sm:text-[15.5px] md:text-[17px] lg:text-[18.5px] xl:text-[20px] 2xl:text-[21.5px]"
          />
        </div>

        {/* Community messages */}
        <Messages />
      </div>
    </section>
  );
};

export default Community;
