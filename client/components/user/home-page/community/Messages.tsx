"use client";

import React, { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Message from "./Message";

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
            end: "bottom 50%",
            scrub: 1,
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
      {data.map((e, i) => (
        <Message key={e.id} i={i} {...e} />
      ))}
    </ul>
  );
};

export default Messages;
