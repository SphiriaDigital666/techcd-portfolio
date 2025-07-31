import React from "react";
import Link from "next/link";

import { navLinks } from "@/lib/constants";

const Footer = () => {
  return (
    <section className="relative pb-[3em]">
      <hr className="mx-auto mb-[3em] w-4/5 border-t-[#4F4F4FCC]" />
      <div className="px-container container mx-auto">
        <div className="mb-[3em] grid grid-cols-1 gap-[2em] lg:grid-cols-10">
          <p className="text-[14px] font-semibold sm:text-[16.5px] md:text-[19px] lg:col-span-4 lg:text-[21.5px] xl:text-[24px] 2xl:text-[26.5px]">
            TECHCD
          </p>

          <div className="flex justify-between text-[12px] uppercase sm:text-[13px] md:text-[14px] lg:col-span-6 lg:text-[15px] xl:text-[16px] 2xl:text-[17px]">
            <ul className="space-y-[1em] uppercase">
              {navLinks.map(({ href, placeholder }) => (
                <li key={href}>
                  <Link href={href}>{placeholder}</Link>
                </li>
              ))}
            </ul>

            <ul className="space-y-[1em] uppercase">
              <li>LinkedIn</li>
              <li>YouTube</li>
              <li>Facebook</li>
            </ul>

            <ul className="space-y-[1em]">
              <li>Terms and Conditions</li>
              <li>Copyright © {new Date().getFullYear()}</li>
            </ul>
          </div>
        </div>

        <ul className="mb-[3em] flex gap-[2em] text-[11px] text-[#686868] sm:text-[11.75px] md:text-[12.5px] lg:text-[13.75px] xl:text-[15px] 2xl:text-[16.25px] dark:text-[#BDBDBD]">
          <li>Terms of Use</li>
          <li>Privacy Policy</li>
          <li>About Cookies</li>
        </ul>

        <p className="mb-[3em] text-[10px] text-[#686868] sm:text-[11.25px] md:text-[12.5px] lg:text-[13.75px] xl:text-[14.4px] 2xl:text-[15px] dark:text-[#BDBDBD]">
          Copyright © {new Date().getFullYear()} Transparent. All rights
          reserved.
        </p>

        <p className="text-[10px] text-[#686868] sm:text-[11.25px] md:text-[12.5px] lg:text-[13.75px] xl:text-[14.4px] 2xl:text-[15px] dark:text-[#BDBDBD]">
          This product focuses on providing organizations with tools to achieve
          financial transparency. It might include features for budgeting,
          expense tracking, financial reporting, and analytics to help
          businesses understand and communicate their financial health clearly.
        </p>
      </div>
    </section>
  );
};

export default Footer;
