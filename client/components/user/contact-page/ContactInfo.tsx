import React from "react";

import { IoLocationOutline } from "react-icons/io5";
import { IoIosCall } from "react-icons/io";
import { TiMessages } from "react-icons/ti";
import Link from "next/link";

const data = [
  {
    id: "001",
    Icon: IoLocationOutline,
    title: "Our Address",
    content: "87 Geylang East Ave 2, Singapore 389753",
    href: "https://maps.app.goo.gl/f1dXZuWLMCK4cQff6",
  },
  {
    id: "002",
    Icon: IoIosCall,
    title: "Contact Info",
    content: " 7645678756",
    href: "tel:7645678756",
  },
  {
    id: "003",
    Icon: TiMessages,
    title: "Mail Info",
    content: "techcd@gmail.com",
    href: "mailto:techcd@gmail.com",
  },
];

const ContactInfo = () => {
  return (
    <section>
      <div className="px-container relative container mx-auto mt-[2em]">
        <div className="grid grid-cols-1 gap-[1.5em] lg:grid-cols-3">
          {data.map(({ Icon, content, href, id, title }) => (
            <div
              key={id}
              className="flex flex-col items-center gap-[0.3em] text-center"
            >
              <div className="bg-primary rounded-[0.3em] p-[0.5em]">
                <Icon className="text-[1.5em]" />
              </div>
              <p className="text-primary mt-[0.2em]">{title}</p>
              <Link
                href={href}
                className="max-w-[20ch] text-[13px] opacity-80 hover:opacity-100 sm:text-[15px] md:text-[17px] lg:text-[19px] xl:text-[20px] 2xl:text-[21px]"
              >
                {content}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
