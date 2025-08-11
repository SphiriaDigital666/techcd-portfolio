import React from "react";

import SectionTitle from "./SectionTitle";
import Content from "./Content";

const FAQ = () => {
  return (
    <section className="relative">
      <div className="from-primary absolute top-1/2 left-0 aspect-square w-2/5 -translate-x-1/2 rounded-full bg-radial to-transparent blur-[5em]"></div>

      <div className="px-container relative container mx-auto mt-[4em] pb-[3em]">
        <SectionTitle />
        <Content />
      </div>
    </section>
  );
};

export default FAQ;
