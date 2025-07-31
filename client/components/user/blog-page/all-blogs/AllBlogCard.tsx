import React from "react";
import Image from "next/image";

import { ImArrowUpRight2 } from "react-icons/im";

const AllBlogCard = () => {
  return (
    <div className="grid grid-cols-1 gap-[1.5em]">
      <div className="bg-foreground/20 relative h-[160px] overflow-hidden rounded-[0.8em] sm:h-[180px] md:h-[200px] lg:h-[220px] xl:h-[240px] 2xl:h-[260px]">
        <Image
          src="/images/sample-img.jpg"
          alt=""
          fill
          className="object-cover object-center"
        />
      </div>

      <div className="flex flex-col gap-[0.5em]">
        <p className="text-primary text-[12px] font-medium sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[17px]">
          Sunday, 1 Jan 2023
        </p>
        <div className="flex items-center justify-between gap-[2em] text-[18px] sm:text-[20px] md:text-[21px] lg:text-[23px] xl:text-[25px] 2xl:text-[26px]">
          <p className="line-clamp-1 pb-[0.1em]">
            Lorem Ipsum is simply dummy text of the
          </p>
          <ImArrowUpRight2 className="shrink-0" />
        </div>
        <p className="text-foreground/40 line-clamp-2 pb-[0.1em] text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[17px] 2xl:text-[18px]">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since
        </p>
        <div className="flex flex-wrap gap-[0.5em] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[17px]">
          <div className="text-primary rounded-full bg-[#EEF4FF] px-[1em] py-[0.4em]">
            Research
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBlogCard;
