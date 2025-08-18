import React from "react";
import Image from "next/image";

import SectionTitle from "./SectionTitle";
import SocialLinks from "./SocialLinks";

import eclipse from "@/public/images/eclipse.svg";

const Header = () => {
  return (
    <section>
      <Image src={eclipse} alt="" className="absolute inset-0 w-full" />
      <div className="px-container relative container mx-auto flex flex-col items-center pt-[8em] text-center lg:items-start lg:text-left">
        <p className="bg-primary text-foreground w-fit rounded-full px-[1em] py-[0.4em] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[18px]">
          Contact Us
        </p>

        <div className="mt-[1em] grid grid-cols-1 gap-[1.5em] lg:mt-[0.5em] lg:grid-cols-11 lg:gap-0">
          <div className="lg:col-span-6">
            <SectionTitle />
            <SocialLinks />
          </div>

          <p className="text-foreground/40 mx-auto max-w-9/10 text-center text-[12px] uppercase sm:text-[13px] md:text-[15px] lg:col-span-5 lg:mx-0 lg:mt-[0.5em] lg:max-w-none lg:text-left lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has survived
            not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged.,
          </p>
        </div>
      </div>
    </section>
  );
};

export default Header;
