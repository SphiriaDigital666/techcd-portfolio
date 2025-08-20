import React from "react";
import Image from "next/image";

import SectionTitle from "./SectionTitle";

import one from "@/public/images/collaborate-page/who/1.png";
import two from "@/public/images/collaborate-page/who/2.png";
import three from "@/public/images/collaborate-page/who/3.png";

const data = [
  {
    id: "001",
    img: one,
    title: "Individuals",
    desc: "IT support & promotions",
  },
  {
    id: "002",
    img: two,
    title: "Startups & Businesses",
    desc: "Reliable software & web solutions",
  },
  {
    id: "003",
    img: three,
    title: "Global Brands",
    desc: "Expand influence in Sri Lanka & beyond",
  },
];

const Who = () => {
  return (
    <section>
      <div className="px-container container mx-auto mt-[6em]">
        <SectionTitle />
        <div className="mt-[2em] grid grid-cols-1 gap-[1.5em] lg:grid-cols-3">
          {data.map(({ img, desc, id, title }) => (
            <div
              key={id}
              className="relative flex flex-col items-center gap-[2em] rounded-[1em] p-[1em] text-center text-[13px] sm:text-[15px] md:text-[17px] lg:text-[19px] xl:text-[20px] 2xl:text-[21px]"
            >
              <Image
                src={img}
                alt=""
                className="size-[60px] sm:size-[66.25px] md:size-[72.5px] lg:size-[78.75px] xl:size-[81.875px] 2xl:size-[85px]"
              />
              <p className="text-primary h-[2.2em] max-w-[13ch] font-semibold uppercase">
                {title}
              </p>
              <p className="max-w-[16ch]">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Who;
