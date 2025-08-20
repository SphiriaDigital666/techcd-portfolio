import React from "react";

import SectionTitle from "./SectionTitle";
import ImageArea from "./ImageArea";

const Story = () => {
  return (
    <section>
      <div className="px-container relative container mx-auto mt-[6em]">
        <div className="from-primary absolute right-0 bottom-0 aspect-square w-2/5 translate-x-1/2 translate-y-1/2 rounded-full bg-radial to-transparent blur-[5em]"></div>
        <SectionTitle className="lg:hidden" />

        <div className="grid grid-cols-1 gap-[1.5em] lg:grid-cols-10 lg:items-center">
          <div className="text-[13px] sm:text-[15px] md:text-[17px] lg:col-span-5 lg:text-[19px] xl:text-[20px] 2xl:text-[21px]">
            <SectionTitle className="mb-[0.5em] hidden lg:flex" />
            <p>
              At TECHCD STUDIOS (PVT) LTD, collaboration is at the heart of
              everything we do. With over 8 years of proven expertise in
              delivering end-to-end software solutions, website development and
              support, and comprehensive IT services, we stand as a trusted
              partner for businesses, startups, and individuals alike.
            </p>
          </div>

          <ImageArea />
        </div>
      </div>
    </section>
  );
};

export default Story;
