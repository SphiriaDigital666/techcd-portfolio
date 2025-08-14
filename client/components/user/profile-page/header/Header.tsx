import React from "react";

import { FaRegEdit } from "react-icons/fa";

const Header = () => {
  return (
    <div className="flex items-center gap-[1em] text-[16px] sm:text-[20px] md:text-[24px] lg:h-[2.2em] lg:text-[28px] xl:text-[32px] 2xl:text-[36px]">
      <div className="relative">
        <div className="bg-foreground/20 outline-primary size-[3.5em] rounded-full outline-2 outline-offset-4"></div>

        <button className="absolute right-0 bottom-0 translate-x-1/2 opacity-70 hover:opacity-100">
          <FaRegEdit />
        </button>
      </div>
      <div>
        <p className="font-semibold">James Bond</p>
        <p className="mt-[0.3em] mb-[0.6em] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[18px]">
          kavindakmanohara@gmail.com
        </p>
        <hr />
      </div>
    </div>
  );
};

export default Header;
