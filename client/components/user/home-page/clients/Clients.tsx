import React from "react";
import Title from "./Title";
import BrandCarousel from "../about/BrandCarousel";

const Clients = () => {
  return (
    <section className="relative overflow-x-clip pt-[3em]">
      <div className="bg-primary absolute top-full left-0 aspect-square w-2/5 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[50px] lg:hidden"></div>

      <div className="px-container relative container mx-auto">
        <Title />
      </div>
      <BrandCarousel />
    </section>
  );
};

export default Clients;
