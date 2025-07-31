import React from "react";
import SectionTitle from "./SectionTitle";
import PrimaryButton from "../../ui/PrimaryButton";

const forumJoinSteps = [
  {
    title: "01",
    desc: "Click Enter Forum",
  },
  {
    title: "02",
    desc: "Register or Login",
  },
  {
    title: "03",
    desc: "Choose a Subscription Tier",
  },
  {
    title: "04",
    desc: "Start engaging!",
  },
];

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

        <div className="grid grid-cols-2 gap-[1.5em] lg:grid-cols-4">
          {forumJoinSteps.map(({ desc, title }, i) => (
            <div key={title} className="relative pe-[1.5em]">
              {i < 3 && (
                <div className="via-foreground absolute top-0 right-0 bottom-0 hidden h-full w-[1px] bg-gradient-to-b from-transparent to-transparent lg:block"></div>
              )}

              <p className="text-primary mb-[0.2em] text-[26px] font-semibold sm:text-[34px] md:text-[43px] lg:text-[51px] xl:text-[60px] 2xl:text-[68px]">
                {title}.
              </p>
              <p className="text-[14px] sm:text-[16px] md:text-[19px] lg:text-[21px] xl:text-[24px] 2xl:text-[26px]">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Join;
