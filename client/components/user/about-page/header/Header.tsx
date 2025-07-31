import React from "react";
import Image from "next/image";

import { BsArrowDown } from "react-icons/bs";
import SectionTitle from "./SectionTitle";

import eclipse from "@/public/images/eclipse.svg";
import img from "@/public/images/about-page/header/img.png";

const Header = () => {
  return (
    <section className="pt-[8em]">
      <Image src={eclipse} alt="" className="absolute inset-0 w-full" />
      <div className="px-container relative container mx-auto">
        <div className="grid grid-cols-1 gap-[1.5em] lg:grid-cols-10">
          <SectionTitle />
          <div className="relative flex h-[202px] items-end lg:col-span-4 lg:h-auto xl:col-span-3">
            <div className="bg-foreground text-background absolute bottom-0 left-0 aspect-square h-[23%] rounded-full lg:h-auto lg:w-[15%]">
              <BsArrowDown className="absolute inset-0 m-auto size-fit text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[25px] 2xl:text-[26px]" />
            </div>
            <Image src={img} alt="" className="h-full w-fit lg:h-auto" />
          </div>
        </div>

        <p className="mx-auto mt-[1.5em] mb-[2em] max-w-[40ch] text-center text-[14px] sm:text-[20px] md:text-[27px] lg:text-[33px] xl:text-[40px] 2xl:text-[46px]">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book.
        </p>
      </div>
    </section>
  );
};

export default Header;
