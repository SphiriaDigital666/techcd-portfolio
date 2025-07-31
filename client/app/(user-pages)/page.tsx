import React from "react";
import Image from "next/image";

import About from "@/components/user/home-page/about/About";
import Hero from "@/components/user/home-page/hero/Hero";
import Community from "@/components/user/home-page/community/Community";
import Store from "@/components/user/home-page/store/Store";

import bg from "@/public/images/home-page/banner/bg.png";

const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <Community />
      <Store />
      <div className="relative">
        <Image
          src={bg}
          alt="Banner"
          className="h-[188px] object-cover object-center sm:h-[281.75px] md:h-[375.5px] lg:h-[469.25px] xl:h-[563px] 2xl:h-[656.75px]"
        />

        <div className="bg-foreground dark:bg-background absolute inset-0 hidden items-center justify-center">
          <button className="group text-background dark:text-foreground relative rounded-xl px-[1.5em] py-[0.6em] shadow-[0_0_1em_rgba(0,132,240,0.4)] transition-all duration-500 ease-linear hover:shadow-none">
            <span className="absolute inset-0 flex items-center justify-center rounded-xl">
              <span className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-xl opacity-0 blur-[8px] transition-all duration-500 ease-linear group-hover:opacity-100">
                <span
                  className="aspect-square w-full scale-110 rounded-full transition-all duration-700 ease-linear group-hover:rotate-180"
                  style={{
                    backgroundImage:
                      "linear-gradient(45deg, #0084f0, #4daaf5, transparent, transparent, #006dc1, #0084f0)",
                  }}
                ></span>
              </span>

              <span className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-xl opacity-0 transition-all duration-500 ease-linear group-hover:opacity-100">
                <span
                  className="aspect-square w-full scale-110 rounded-full transition-all duration-700 ease-linear group-hover:rotate-180"
                  style={{
                    backgroundImage:
                      "linear-gradient(45deg, #0084f0, #4daaf5, transparent, transparent, #006dc1, #0084f0)",
                  }}
                ></span>
              </span>

              <span className="absolute inset-0 m-[2px] rounded-xl bg-black"></span>
            </span>

            <span className="font-secondary relative uppercase">HOVER</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
