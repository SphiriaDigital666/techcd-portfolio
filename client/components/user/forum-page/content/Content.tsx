import React from "react";

import SectionTitle from "./SectionTitle";
import { IoArrowForward } from "react-icons/io5";

const forumContentData = [
  {
    id: "001",
    title: "Discussion Categories",
    desc: "General Chat, Suggestions, Fan Art, Exclusive Premium Content",
  },
  {
    id: "002",
    title: "Subscriber-Only Features",
    desc: "Thread creation, comments, private messages",
  },
  {
    id: "003",
    title: "Premium Perks",
    desc: "Exclusive discussions, early product drops, giveaways",
  },
];

const Content = () => {
  return (
    <section>
      <div className="px-container relative container mx-auto mt-[4em]">
        <SectionTitle />

        <div className="mt-[2em] grid grid-cols-1 gap-[1.5em] lg:grid-cols-3">
          {forumContentData.map(({ desc, id, title }) => (
            <div
              key={id}
              className="bg-foreground/5 rounded-[1em] p-[1em] text-[14px] sm:text-[16px] md:text-[19px] lg:text-[21px] xl:text-[24px] 2xl:text-[26px]"
            >
              <div className="rounded-[0.9em] bg-gradient-to-b from-[#028EFC]/70 to-[#002643]/70 p-[1em]">
                <p className="mb-[0.7em] text-[16px] sm:text-[20px] md:text-[24px] lg:h-[2.2em] lg:text-[28px] xl:text-[32px] 2xl:text-[36px]">
                  {title}
                </p>
                <p className="font-light lg:h-[4.4em] 2xl:h-[3.3em]">{desc}</p>
              </div>

              <button className="group mx-auto mt-[0.5em] flex items-center gap-[0.1em]">
                Explore
                <div className="bg-primary text-background group-hover:text-foreground group-focus:text-foreground relative m-[0.3em] size-[1.3em] rounded-full transition-all duration-500 group-hover:bg-transparent group-focus:bg-transparent">
                  <IoArrowForward className="absolute inset-0 m-auto group-hover:animate-pulse group-focus:animate-pulse" />
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Content;
