"use client";

import React, { useRef } from "react";
import Image from "next/image";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { GoArrowUpRight } from "react-icons/go";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

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

const Messages = () => {
  const containerRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const messages = containerRef.current?.querySelectorAll(".forum-message");

      messages?.forEach((e) => {
        gsap.from(e, {
          duration: 1,
          opacity: 0,
          xPercent: -5,
          filter: "blur(10px)",
          scrollTrigger: {
            trigger: e,
            start: "top 80%",
          },
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <ul
      ref={containerRef}
      className="mt-[2em] space-y-[1em] text-[14px] sm:text-[16.5px] md:text-[19px] lg:text-[21.5px] xl:text-[24px] 2xl:text-[26.5px]"
    >
      {data.map(({ id, avatar, message, elapsedTime, username }, i) => (
        <li key={id} className="forum-message">
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
  );
};

export default Messages;
