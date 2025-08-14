"use client";

import React, { useEffect } from "react";
import Image from "next/image";

import { GoArrowUpRight } from "react-icons/go";
import { cn } from "@/lib/utils";

type MessageProps = {
  i: number;
  id: string;
  avatar: string;
  username: string;
  elapsedTime: string;
  message: string;
};

const Message: React.FC<MessageProps> = ({
  avatar,
  elapsedTime,
  i,
  message,
  username,
}) => {
  useEffect(() => {
    const container: HTMLUListElement | null = document.querySelector(
      ".home-page-community",
    );
    if (!container) return;

    const messages: NodeListOf<HTMLLIElement> =
      container?.querySelectorAll(".forum-message");
    if (!messages) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      messages.forEach((e) => {
        const light: HTMLDivElement | null = e.querySelector(
          ".forum-message-bg-light",
        );
        if (!light) return;

        const divX = e.getBoundingClientRect().x;
        const divY = e.getBoundingClientRect().y;

        const mouseX = Math.floor(x - divX);
        const mouseY = Math.floor(y - divY);

        const lightW = light.offsetWidth;
        const lightH = light.offsetHeight;

        const transformX = mouseX - lightW / 2;
        const transformY = mouseY - lightH / 2;

        light.style.transform = `translate(${transformX}px, ${transformY}px)`;
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <li className="forum-message">
      <article
        className={cn(
          "relative grid grid-cols-1 gap-[1.5em] overflow-hidden rounded-[1em] px-[2em] py-[1.5em] lg:grid-cols-11 lg:rounded-[1.3em] lg:px-[1.5em] lg:py-[1em]",
          i % 2 === 0 && "border-foreground/30 bg-foreground/8 border",
        )}
      >
        {/* Light */}
        <div className="from-foreground/30 forum-message-bg-light absolute aspect-square w-1/5 rounded-full bg-radial to-transparent opacity-0 blur-[20px] transition-opacity group-hover:opacity-100"></div>

        {/* message */}
        <p className="line-clamp-2 overflow-clip lg:col-span-6">{message}</p>

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
  );
};

export default Message;
