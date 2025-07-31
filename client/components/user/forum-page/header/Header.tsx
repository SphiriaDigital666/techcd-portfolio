import React from "react";
import Image from "next/image";

import { BsArrowDown } from "react-icons/bs";
import SectionTitle from "./SectionTitle";
import PrimaryButton from "../../ui/PrimaryButton";

import eclipse from "@/public/images/eclipse.svg";
import img from "@/public/images/forum-page/header/img.png";

const Header = () => {
  return (
    <section className="pt-[8em]">
      <Image src={eclipse} alt="" className="absolute inset-0 w-full" />
      <div className="px-container relative container mx-auto">
        <SectionTitle className="mb-[0.7em] lg:hidden" />

        <div className="grid grid-cols-1 gap-[1.5em] lg:grid-cols-10">
          <div className="lg:col-span-6 xl:col-span-7">
            <SectionTitle className="hidden lg:block" />
            <p className="text-[12px] sm:text-[13px] md:text-[15px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
              Connect with like-minded fans, share your passion, and interact
              through discussions, exclusive content, and events. Join the
              movement and become a valued part of our growing, vibrant
              community!
            </p>
            <PrimaryButton
              text="Enter Forum"
              className="mt-[1em] text-[12px] sm:text-[13px] md:text-[15px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]"
            />
          </div>

          <div className="relative row-start-1 flex h-[202px] items-end lg:col-span-4 lg:row-start-auto lg:h-auto xl:col-span-3">
            <div className="bg-foreground text-background absolute bottom-0 left-0 aspect-square h-[23%] rounded-full lg:h-auto lg:w-[15%]">
              <BsArrowDown className="absolute inset-0 m-auto size-fit text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[25px] 2xl:text-[26px]" />
            </div>
            <Image src={img} alt="" className="h-full w-fit lg:h-auto" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
