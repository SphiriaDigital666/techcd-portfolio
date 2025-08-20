import React from "react";

import SectionTitle from "./SectionTitle";
import CardContainer from "./CardContainer";

const Why = () => {
  return (
    <section className="relative">
      <div className="from-primary absolute right-0 bottom-0 aspect-square w-2/5 translate-x-1/2 translate-y-1/2 rounded-full bg-radial to-transparent blur-[5em]"></div>

      <div className="px-container relative container mx-auto mt-[6em]">
        <SectionTitle />
        <CardContainer />
      </div>
    </section>
  );
};

export default Why;
