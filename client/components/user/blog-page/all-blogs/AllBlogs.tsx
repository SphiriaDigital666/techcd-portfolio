"use client";

import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

import AllBlogCard from "./AllBlogCard";

const AllBlogs = () => {
  const [pageSize, setPageSize] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let size = 3;

      if (width < 640) size = 3;
      else if (width < 768) size = 9;
      else size = 9;

      setPageSize(size);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <section className="relative">
      <div className="from-primary absolute top-0 right-0 aspect-square w-2/5 translate-x-1/2 rounded-full bg-radial to-transparent blur-[5em]"></div>
      <div className="from-primary absolute top-1/2 left-0 aspect-square w-2/5 -translate-x-1/2 rounded-full bg-radial to-transparent blur-[5em]"></div>

      <div className="px-container relative container mx-auto py-[2em]">
        <p className="mb-[0.8em] text-[18px] font-medium uppercase sm:text-[20px] md:text-[21px] lg:text-[23px] xl:text-[25px] 2xl:text-[26px]">
          All blog posts
        </p>

        <div className="mb-[1.5em] grid grid-cols-1 gap-[1.5em] text-[13px] sm:text-[15px] md:text-[17px] lg:grid-cols-5 lg:text-[19px] xl:text-[20px] 2xl:text-[21px]">
          <div className="flex flex-wrap gap-[0.5em] lg:col-span-3">
            <div className="border-foreground/30 rounded-full border px-[2em] py-[0.4em] uppercase">
              All
            </div>
            <div className="border-foreground/30 rounded-full border px-[2em] py-[0.4em] uppercase">
              Testing
            </div>
            <div className="border-foreground/30 rounded-full border px-[2em] py-[0.4em] uppercase">
              Testing
            </div>
            <div className="border-foreground/30 rounded-full border px-[2em] py-[0.4em] uppercase">
              Testing
            </div>
          </div>

          <div className="border-foreground/30 flex h-fit items-center gap-[1em] rounded-full border px-[1em] lg:col-span-2">
            <input
              type="text"
              placeholder="search"
              className="text-foreground placeholder:text-foreground/40 w-full bg-transparent py-[0.5em] focus:outline-none"
            />
            <CiSearch />
          </div>
        </div>

        <div className="grid grid-cols-1 grid-rows-3 gap-[1.5em] sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: pageSize }).map((_, i) => (
            <AllBlogCard key={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllBlogs;
