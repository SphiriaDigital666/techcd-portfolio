import React from "react";
import SectionTitle from "./SectionTitle";
import PrimaryButton from "../../ui/PrimaryButton";
import Steps from "./Steps";

const Join = () => {
  return (
    <section className="relative">
      <div className="from-primary absolute top-0 right-0 aspect-square w-2/5 translate-x-1/2 -translate-y-1/3 rounded-full bg-radial to-transparent blur-[5em]"></div>

      <div className="px-container relative container mx-auto mt-[4em]">
        <SectionTitle />
        <p className="text-[14px] sm:text-[16px] md:text-[19px] lg:text-[21px] xl:text-[24px] 2xl:text-[26px]">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. 
        </p>
        <PrimaryButton
          text="Enter Forum"
          className="my-[2em] text-[13px] sm:text-[15px] md:text-[17px] lg:col-span-6 lg:text-[19px] xl:text-[20px] 2xl:text-[21px]"
        />

        <Steps />
      </div>
    </section>
  );
};

export default Join;
