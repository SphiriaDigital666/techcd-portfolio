"use client";

import React from "react";

const Loading = () => {
  return (
    <div className="relative grid grid-cols-1 gap-[1.5em] lg:grid-cols-5">
      <div className="bg-foreground/5 border-foreground/20 flex h-full animate-pulse items-end rounded-[1em] border p-[1em] text-[13px] sm:text-[15px] md:text-[17px] lg:col-span-1 lg:text-[19px] xl:text-[20px] 2xl:text-[21px]">
        <div className="via-foreground mt-[1.2em] h-[1px] w-full bg-gradient-to-r from-transparent to-transparent"></div>
      </div>

      <div className="text-[13px] sm:text-[15px] md:text-[17px] lg:col-span-4 lg:text-[19px] xl:text-[20px] 2xl:text-[21px]">
        <div className="mb-[1em] font-medium">Loading Products</div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-foreground/10 border-foreground/30 h-[200px] animate-pulse rounded-[1em] border p-[1em] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] 2xl:h-[450px]"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
