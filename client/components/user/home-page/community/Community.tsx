import React from "react";
import Image from "next/image";

import { GoArrowUpRight } from "react-icons/go";

import { cn } from "@/lib/utils";
import Title from "./Title";
import PrimaryButton from "../../ui/PrimaryButton";

const data = [
  {
    id: "001",
    avatar: "https://i.imgur.com/3V5GBQW.jpeg",
    username: "kevin dias",
    elapsedTime: "7 minutes ago",
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: "002",
    avatar: "https://i.imgur.com/mKHkbb4.jpeg",
    username: "kevin dias",
    elapsedTime: "7 minutes ago",
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: "003",
    avatar: "https://i.imgur.com/sNXftlo.jpeg",
    username: "kevin dias",
    elapsedTime: "7 minutes ago",
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: "004",
    avatar: "https://i.imgur.com/t7qc2Bc.jpeg",
    username: "kevin dias",
    elapsedTime: "7 minutes ago",
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: "005",
    avatar: "https://i.imgur.com/YNMQ5V5.jpeg",
    username: "kevin dias",
    elapsedTime: "7 minutes ago",
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
];

const Community = () => {
  return (
    <section className="relative overflow-x-clip py-[3em]">
      {/* Leaklights (for screens <1024px) */}
      <div className="bg-primary absolute top-0 left-0 aspect-square w-2/5 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[50px] lg:hidden"></div>
      <div className="absolute right-0 bottom-0 h-4/5 w-3/5 translate-x-1/2 translate-y-1/12 rounded-full bg-[#028EFC]/60 blur-[100px] lg:hidden"></div>

      {/* Leaklight (for screens >=1024px) */}
      <div className="absolute top-0 right-0 hidden aspect-square w-3/5 translate-x-1/2 -translate-y-1/12 rounded-full bg-[#028EFC]/60 blur-[100px] lg:block"></div>

      <div className="px-container relative container mx-auto">
        {/* Title area */}
        <Title />

        {/* Button area */}
        <div className="mt-[1em] flex flex-col gap-[1em] text-[16px] sm:flex-row sm:items-center sm:text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] 2xl:text-[36px]">
          <p>JOIN THE EXCLUSIVE FAN</p>
          <PrimaryButton
            text="MORE NOW"
            className="w-fit gap-[1.5em] ps-[3em] text-[14px] sm:text-[15.5px] md:text-[17px] lg:text-[18.5px] xl:text-[20px] 2xl:text-[21.5px]"
          />
        </div>

        {/* Community messages */}
        <ul className="mt-[2em] space-y-[1em] text-[14px] sm:text-[16.5px] md:text-[19px] lg:text-[21.5px] xl:text-[24px] 2xl:text-[26.5px]">
          {data.map(({ id, avatar, message, elapsedTime, username }, i) => (
            <li key={id}>
              <article
                className={cn(
                  "grid grid-cols-1 gap-[1.5em] rounded-[1em] px-[2em] py-[1.5em] lg:grid-cols-11 lg:rounded-[1.3em] lg:px-[1.5em] lg:py-[1em]",
                  i % 2 === 0 && "border-foreground/30 bg-foreground/8 border",
                )}
              >
                {/* message */}
                <p className="line-clamp-2 overflow-clip lg:col-span-6">
                  {message}
                </p>

                <div className="flex items-center justify-between lg:col-span-5 lg:ms-[10%]">
                  <div className="flex items-center gap-[1.5em]">
                    {/* Avatar */}
                    <div className="bg-foreground/30 relative size-[40px] overflow-clip rounded-full sm:size-[44.4px] md:size-[48.8px] lg:size-[55.4px] xl:size-[62px] 2xl:size-[68.6px]">
                      <Image
                        src={avatar}
                        alt={username}
                        fill
                        className="object-cover object-center"
                      />
                    </div>

                    {/* Usename and time */}
                    <div>
                      <p className="line-clamp-1 max-w-[11ch] overflow-clip font-medium">
                        KEVIN DIAS
                      </p>
                      <p className="mt-[0.3em] text-[13px] font-light sm:text-[15.25px] md:text-[17.5px] lg:text-[19.75px] xl:text-[22px] 2xl:text-[24.25px]">
                        {elapsedTime}
                      </p>
                    </div>
                  </div>

                  {/* Button */}
                  <button className="border-foreground relative size-[2.5em] rounded-full border">
                    <GoArrowUpRight className="text-primary absolute inset-0 m-auto text-[1.5em]" />
                  </button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Community;
