import React from "react";
import BrandCarousel from "../../home-page/about/BrandCarousel";
import SectionTitle from "./SectionTitle";

const Brands = () => {
  return (
    <section>
      <div className="px-container conatiner mx-auto mt-[6em] mb-[3em]">
        <SectionTitle />
      </div>
      <BrandCarousel />
    </section>
  );
};

export default Brands;
