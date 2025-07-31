import React from "react";
import Image from "next/image";

import { IoCalendarOutline } from "react-icons/io5";
import { ImArrowUpRight2 } from "react-icons/im";

const HeaderContent = () => {
  return (
    <div className="bg-foreground/10 relative mt-[1.5em] h-[500px] overflow-hidden rounded-[1em] sm:h-[550px] md:h-[600px] lg:h-[650px] xl:h-[700px] 2xl:h-[750px]">
      <Image
        src="/images/sample-img.jpg"
        alt=""
        fill
        className="object-cover object-center"
      />
      <div className="absolute right-0 bottom-0 left-0 rounded-[1em] bg-black/30 px-[3em] py-[2em] text-[13px] backdrop-blur-sm sm:text-[15px] md:text-[17px] lg:text-[19px] xl:text-[20px] 2xl:text-[21px]">
        <div className="grid grid-cols-1 gap-[1.4em] lg:grid-cols-10">
          <div className="lg:col-span-9">
            <p className="line-clamp-2 pb-[0.1em] text-[18px] font-semibold sm:text-[20px] md:text-[23px] lg:text-[25px] xl:text-[28px] 2xl:text-[30px]">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
            <p className="mt-[0.4em] line-clamp-2 pb-[0.1em] font-medium">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s, standard dummy text ever
            </p>
          </div>
          <div className="row-start-1 flex w-full justify-end lg:col-span-1 lg:row-start-auto">
            <ImArrowUpRight2 className="text-foreground text-[2em]" />
          </div>
        </div>

        <div className="mt-[1.5em] flex flex-col gap-[1.5em] lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-[1em]">
            <div className="border-foreground/30 w-fit rounded-full border p-[0.5em]">
              <IoCalendarOutline />
            </div>
            <p> June 25, 2025</p>
          </div>
          <div className="flex flex-wrap gap-[0.5em]">
            <div className="border-foreground/30 rounded-full border px-[3em] py-[0.4em]">
              Test
            </div>
            <div className="border-foreground/30 rounded-full border px-[3em] py-[0.4em]">
              Test
            </div>
            <div className="border-foreground/30 rounded-full border px-[3em] py-[0.4em]">
              Test
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderContent;
