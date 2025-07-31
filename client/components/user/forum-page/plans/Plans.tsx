import React from "react";

import { GoArrowUpRight } from "react-icons/go";
import SectionTitle from "./SectionTitle";

const forumPlansData = [
  {
    id: "001",
    title: "Basic",
    price: "12.00",
  },
  {
    id: "002",
    title: "Standard",
    price: "10.00",
  },
  {
    id: "003",
    title: "Premium",
    price: "20.00",
  },
];

const Plans = () => {
  return (
    <section>
      <div className="px-container relative container mx-auto mt-[4em]">
        <SectionTitle />

        <div className="mt-[2em] grid grid-cols-1 gap-[1.5em] lg:grid-cols-3">
          {forumPlansData.map(({ id, price, title }) => (
            <div
              key={id}
              className="bg-primary/20 relative rounded-[1em] p-[1em] text-[15px] sm:text-[18px] md:text-[22px] lg:text-[25px] xl:text-[28px] 2xl:text-[31px]"
            >
              <div className="bg-foreground text-background absolute top-[0.5em] right-[0.5em] m-auto aspect-square w-[12%] rounded-full">
                <GoArrowUpRight className="absolute inset-0 m-auto size-fit text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[25px] 2xl:text-[26px]" />
              </div>

              <p className="relative">{title}</p>
              <p className="relative my-[0.5em] flex items-center text-[18px] font-semibold sm:text-[23px] md:text-[29px] lg:text-[34px] xl:text-[40px] 2xl:text-[45px]">
                ${price}
                <span className="text-[0.8em]">/mo</span>
              </p>
              <p className="relative text-[#5494BC]">
                ${price} billed every month
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Plans;
