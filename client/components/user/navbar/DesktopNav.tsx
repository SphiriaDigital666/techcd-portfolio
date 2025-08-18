import React from "react";
import Link from "next/link";

import { LiaShoppingBagSolid } from "react-icons/lia";
import { FaRegUser } from "react-icons/fa6";

import { navLinks } from "@/lib/constants";
import ThemeToggle from "./ThemeToggle";

const DesktopNav: React.FC<{
  getActiveLinkClasses: (href: string) => string;
}> = ({ getActiveLinkClasses }) => {
  return (
    <>
      <nav className="hidden lg:flex lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
        <ul className="flex items-center gap-[1.5em]">
          {navLinks.map(({ href, placeholder }) => (
            <li key={href}>
              <Link href={href} className={getActiveLinkClasses(href)}>
                {placeholder}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="hidden lg:flex lg:gap-[1.5em] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
        <ThemeToggle />

        <div className="text-foreground flex items-center justify-center gap-[0.5em] font-medium">
          <Link href="/cart" className="hover:opacity-80 focus:opacity-80">
            <LiaShoppingBagSolid className="text-[1.5em]" />
          </Link>
          <Link href="/profile" className="hover:opacity-80 focus:opacity-80">
            <FaRegUser className="text-[1.2em]" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default DesktopNav;
