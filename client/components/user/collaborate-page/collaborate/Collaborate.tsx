import React from "react";

const Collaborate = () => {
  return (
    <section className="relative">
      <div className="from-primary absolute bottom-0 left-0 aspect-square w-2/5 -translate-x-1/2 translate-y-1/2 rounded-full bg-radial to-transparent blur-[5em]"></div>

      <div className="px-container relative container mx-auto my-[6em] flex flex-col items-center gap-[1.5em] text-center">
        <p className="text-foreground/80 max-w-[28ch] text-[20px] font-semibold sm:text-[27px] md:text-[34px] lg:text-[41px] xl:text-[48px] 2xl:text-[55px]">
          Let’s Create Something Extraordinary Together
        </p>
        <p className="max-w-[35ch] text-[16px] sm:text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] 2xl:text-[36px]">
          Partner with TECHCD STUDIOS today and unlock innovation + influence
        </p>
        <button className="bg-foreground/20 hover:bg-foreground/30 w-fit rounded-full px-[2em] py-[0.5em] text-[16px] font-medium transition-all sm:text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] 2xl:text-[36px]">
          Collaborate Now
        </button>
      </div>
    </section>
  );
};

export default Collaborate;
