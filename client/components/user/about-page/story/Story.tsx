import React from "react";

import SectionTitle from "./SectionTitle";
import ImageArea from "./ImageArea";
import Banner from "./Banner";

const Story = () => {
  return (
    <section>
      <div className="px-container relative container mx-auto">
        <div className="from-primary absolute right-0 bottom-0 aspect-square w-2/5 translate-x-1/2 translate-y-1/2 rounded-full bg-radial to-transparent blur-[5em]"></div>
        <SectionTitle className="lg:hidden" />

        <div className="grid grid-cols-1 gap-[1.5em] lg:grid-cols-10 lg:items-end">
          <div className="text-[13px] sm:text-[15px] md:text-[17px] lg:col-span-6 lg:text-[19px] xl:text-[20px] 2xl:text-[21px]">
            <SectionTitle className="mb-[0.5em] hidden lg:flex" />
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book. It has
              survived not only five centuries.
            </p>
            <br />
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book.
            </p>
          </div>

          <ImageArea />
        </div>

        <Banner />
      </div>
    </section>
  );
};

export default Story;
