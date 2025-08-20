import React from "react";

import { LuMonitorCog } from "react-icons/lu";
import { IoGlobeOutline } from "react-icons/io5";
import { GrAnnounce } from "react-icons/gr";
import { FaRegHandshake } from "react-icons/fa";

import SectionTitle from "./SectionTitle";

const data = [
  {
    id: "001",
    Icon: LuMonitorCog,
    title: "Tech Expertise",
    desc: "Software, web & IT solutions",
  },
  {
    id: "002",
    Icon: IoGlobeOutline,
    title: "Global Influence",
    desc: "Worked with Binance, Redbull, AliExpress, XM.com",
  },
  {
    id: "003",
    Icon: GrAnnounce,
    title: "Marketing Power",
    desc: "Social media campaigns reaching millions",
  },
  {
    id: "004",
    Icon: FaRegHandshake,
    title: "Long-Term Partnerships",
    desc: "Focus on relationships & measurable success",
  },
];

const Why = () => {
  return (
    <section>
      <div className="px-container container mx-auto mt-[3em]">
        <SectionTitle />
        <div className="mt-[2em] grid grid-cols-1 gap-[1.5em] sm:grid-cols-2 lg:grid-cols-4">
          {data.map(({ Icon, desc, id, title }) => (
            <div
              key={id}
              className="relative flex flex-col items-center gap-[2em] rounded-[1em] p-[1em] text-center text-[13px] sm:text-[15px] md:text-[17px] lg:text-[19px] xl:text-[20px] 2xl:text-[21px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 size-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="strokeGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="var(--foreground)"
                      stopOpacity="0"
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--foreground)"
                      stopOpacity="1"
                    />
                  </linearGradient>
                </defs>

                <rect
                  width="100"
                  height="100"
                  x="0"
                  y="0"
                  rx="6"
                  ry="6"
                  fill="var(--foreground)"
                  fillOpacity={0.05}
                  stroke="url(#strokeGradient)"
                  strokeWidth={0.2}
                />
              </svg>

              <Icon className="text-primary relative text-[4.5em]" />
              <p className="dark:from-foreground to-foreground relative h-[2.2em] max-w-[13ch] bg-gradient-to-b from-[#999999] bg-clip-text font-semibold text-transparent uppercase dark:to-[#999999]">
                {title}
              </p>
              <p className="relative max-w-[16ch]">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Why;
