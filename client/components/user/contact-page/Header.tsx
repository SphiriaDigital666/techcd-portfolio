import React from "react";
import Image from "next/image";

import { FaFacebookF, FaYoutube, FaTiktok, FaInstagram } from "react-icons/fa";

import eclipse from "@/public/images/eclipse.svg";

const Header = () => {
  return (
    <section>
      <Image src={eclipse} alt="" className="absolute inset-0 w-full" />
      <div className="px-container relative container mx-auto flex flex-col items-center pt-[8em] text-center lg:items-start lg:text-left">
        <p className="bg-primary text-foreground w-fit rounded-full px-[1em] py-[0.4em] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[18px]">
          Contact Us
        </p>

        <div className="mt-[1em] flex flex-col gap-[0.5em] lg:mt-[0.5em] lg:flex-row lg:gap-[1.5em]">
          <h2 className="dark:from-foreground to-foreground bg-gradient-to-b from-[#999999] bg-clip-text text-[26px] font-semibold text-transparent uppercase sm:text-[34px] md:text-[43px] lg:shrink-0 lg:text-[51px] xl:text-[60px] 2xl:text-[68px] dark:to-[#999999]">
            Reach Out for <br /> More Information
          </h2>
          <p className="text-foreground/40 mx-auto max-w-9/10 text-center text-[12px] uppercase sm:text-[13px] md:text-[15px] lg:mx-0 lg:mt-[0.5em] lg:max-w-none lg:text-left lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has survived
            not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged.,
          </p>
        </div>

        <div className="flex gap-[1em]">
          <button className="rounded-full border p-[0.5em] opacity-80 hover:opacity-100">
            <FaFacebookF />
          </button>

          <button className="rounded-full border p-[0.5em] opacity-80 hover:opacity-100">
            <FaYoutube />
          </button>

          <button className="rounded-full border p-[0.5em] opacity-80 hover:opacity-100">
            <FaTiktok />
          </button>

          <button className="rounded-full border p-[0.5em] opacity-80 hover:opacity-100">
            <FaInstagram />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Header;
