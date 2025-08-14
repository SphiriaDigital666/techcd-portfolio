import React from "react";
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
  return (
    <li className="forum-message">
      <article
        className={cn(
          "grid grid-cols-1 gap-[1.5em] rounded-[1em] px-[2em] py-[1.5em] lg:grid-cols-11 lg:rounded-[1.3em] lg:px-[1.5em] lg:py-[1em]",
          i % 2 === 0 && "border-foreground/30 bg-foreground/8 border",
        )}
      >
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
