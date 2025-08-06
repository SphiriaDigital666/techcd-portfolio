import React from "react";
import Title from "./Title";
import BrandCarousel from "../about/BrandCarousel";

const Clients = () => {
  return (
    <section className="relative overflow-x-clip pt-[3em]">
      <div className="px-container relative container mx-auto">
        <Title />
      </div>
      <BrandCarousel />
    </section>
  );
};

export default Clients;
