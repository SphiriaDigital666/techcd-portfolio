import React from "react";

import about from "@/public/images/home-page/about/about.png";
import Image from "next/image";
import Title from "./Title";
import TitleLg from "./TitleLg";

const About = () => {
  return (
    <section className="relative pt-[10vw] lg:pt-0 xl:-mt-[2vw]">
      {/* Gradient (for screens <1024px) */}
      <div className="from-primary absolute inset-0 bg-gradient-to-br to-transparent lg:hidden"></div>

      <div className="px-container relative container mx-auto lg:mb-[1.5em] lg:grid lg:grid-cols-11 lg:items-end">
        {/* Title (for screens <1024px) */}
        <Title />

        {/* Image area */}
        <div className="mx-auto aspect-[25/23] w-4/5 sm:w-3/5 md:w-1/2 lg:relative lg:z-[1] lg:col-span-6 lg:w-full">
          <Image src={about} alt="About" className="w-full" />
        </div>

        {/* Text area */}
        <div className="mt-[1em] mb-[1.5em] flex flex-col items-end text-center text-[21px] sm:text-[21.75px] md:text-[22.5px] lg:col-span-5 lg:text-left lg:text-[23.25px] xl:text-[24px] 2xl:mb-[3em] 2xl:text-[24.75px]">
          {/* Title (for screens >=1024px) */}
          <TitleLg />

          <p className="mb-[1em]">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book.
          </p>

          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
