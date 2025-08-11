import React from "react";
import Image from "next/image";

import SectionTitle from "./SectionTitle";
import TextReveal from "./TextReveal";

import eclipse from "@/public/images/eclipse.svg";
import ImageArea from "./ImageArea";

const Header = () => {
  return (
    <section id="about-page-header" className="pt-[8em]">
      <Image src={eclipse} alt="" className="absolute inset-0 w-full" />
      <div className="px-container relative container mx-auto">
        <div className="grid grid-cols-1 gap-[1.5em] lg:grid-cols-10">
          <div className="lg:col-span-6 xl:col-span-7">
            <p className="bg-primary text-foreground w-fit rounded-full px-[1em] py-[0.4em] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[18px]">
              About Us
            </p>
            <SectionTitle />
            <p className="text-[12px] sm:text-[13px] md:text-[15px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </p>
          </div>

          <ImageArea />
        </div>

        <TextReveal />
      </div>
    </section>
  );
};

export default Header;
