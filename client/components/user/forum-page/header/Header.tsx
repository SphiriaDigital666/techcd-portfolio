import React from "react";
import Image from "next/image";

import SectionTitle from "./SectionTitle";
import PrimaryButton from "../../ui/PrimaryButton";
import ImageArea from "./ImageArea";

import eclipse from "@/public/images/eclipse.svg";

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

          <ImageArea />
        </div>
      </div>
    </section>
  );
};

export default Header;
