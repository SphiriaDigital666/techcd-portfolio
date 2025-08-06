import React from "react";
import Image from "next/image";

import Hero from "@/components/user/home-page/hero/Hero";
import About from "@/components/user/home-page/about/About";
import Clients from "@/components/user/home-page/clients/Clients";
import Community from "@/components/user/home-page/community/Community";
import Store from "@/components/user/home-page/store/Store";

import bg from "@/public/images/home-page/banner/bg.png";

const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <Clients />
      <Community />
      <Store />
      <div className="relative">
        <Image
          src={bg}
          alt="Banner"
          className="h-[188px] object-cover object-center sm:h-[281.75px] md:h-[375.5px] lg:h-[469.25px] xl:h-[563px] 2xl:h-[656.75px]"
        />
      </div>
    </>
  );
};

export default HomePage;
