import React from "react";
import Image from "next/image";

import SectionTitle from "./SectionTitle";
import eclipse from "@/public/images/eclipse.svg";
import PrimaryButton from "../../ui/PrimaryButton";

const Header = () => {
  return (
    <section>
      <Image src={eclipse} alt="" className="absolute inset-0 w-full" />
      <div className="px-container relative container mx-auto flex flex-col items-center pt-[8em] text-center lg:items-start lg:text-left">
        <p className="bg-primary text-foreground w-fit rounded-full px-[1em] py-[0.4em] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[18px]">
          Collaborate
        </p>

        <div className="mt-[1em] grid grid-cols-1 gap-[1.5em] lg:mt-[0.5em] lg:grid-cols-11 lg:gap-0">
          <div className="lg:col-span-6">
            <SectionTitle />
            <p className="dark:from-foreground to-foreground mt-[0.2em] bg-gradient-to-b from-[#999999] bg-clip-text text-[13px] text-transparent sm:text-[15px] md:text-[17px] lg:text-[19px] xl:text-[20px] 2xl:text-[21px] dark:to-[#999999]">
              Innovation Meets Influence At TECHCD STUDIOS
            </p>
          </div>

          <div className="mx-auto max-w-9/10 lg:col-span-5 lg:mx-0 lg:mt-[0.5em] lg:max-w-none">
            <p className="text-foreground/40 text-center text-[12px] uppercase sm:text-[13px] md:text-[15px] lg:text-left lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
              Partner with TECHCD STUDIOS to create meaningful impact. With 8+
              years of expertise in IT services, software, and marketing, we
              empower individuals, startups, and global brands to grow through
              innovation, reliable support, and powerful digital influence.
            </p>
            <PrimaryButton
              text="Start Collaboration"
              iconStyles="bg-foreground"
              className="mx-auto mt-[0.7em] text-[12px] sm:text-[13px] md:text-[15px] lg:mx-0 lg:text-[16px] xl:text-[18px] 2xl:text-[20px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
