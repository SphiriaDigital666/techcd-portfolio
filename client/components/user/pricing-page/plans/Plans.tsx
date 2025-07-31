import React from "react";
import SectionTitle from "./SectionTitle";
import SectionContent from "./SectionContent";
import BrandCarousel from "../../home-page/about/BrandCarousel";

const Plans = () => {
  return (
    <section className="relative overflow-hidden pb-[3em]">
      <div className="from-primary absolute top-1/5 right-0 aspect-square w-2/5 translate-x-1/2 rounded-full bg-radial to-transparent blur-[5em]"></div>
      <div className="from-primary absolute bottom-1/6 left-0 aspect-square w-2/5 -translate-x-1/2 rounded-full bg-radial to-transparent blur-[5em]"></div>

      <div className="px-container relative container mx-auto pb-[3em]">
        <SectionTitle />
        <SectionContent />
      </div>

      <BrandCarousel />
    </section>
  );
};

export default Plans;
