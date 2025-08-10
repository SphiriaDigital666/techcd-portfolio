import React from "react";

import Hero from "@/components/user/home-page/hero/Hero";
import About from "@/components/user/home-page/about/About";
import Clients from "@/components/user/home-page/clients/Clients";
import Community from "@/components/user/home-page/community/Community";
import Store from "@/components/user/home-page/store/Store";
import Banner from "@/components/user/home-page/banner/Banner";

const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <Clients />
      <Community />
      <Store />
      <Banner />
    </>
  );
};

export default HomePage;
