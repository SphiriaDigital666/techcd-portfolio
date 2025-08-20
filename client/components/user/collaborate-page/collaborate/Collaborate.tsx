import React from "react";

import TextReveal from "./TextReveal";
import ButtonArea from "./ButtonArea";

const Collaborate = () => {
  return (
    <section id="collaborate-page-call-to-action" className="relative">
      <div className="from-primary absolute bottom-0 left-0 aspect-square w-2/5 -translate-x-1/2 translate-y-1/2 rounded-full bg-radial to-transparent blur-[5em]"></div>

      <div className="px-container relative container mx-auto flex flex-col items-center gap-[1.5em] py-[6em] text-center">
        <TextReveal />
        <p className="max-w-[35ch] text-[16px] sm:text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] 2xl:text-[36px]">
          Partner with TECHCD STUDIOS today and unlock innovation + influence
        </p>
        <ButtonArea />
      </div>
    </section>
  );
};

export default Collaborate;
