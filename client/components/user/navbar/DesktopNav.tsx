import React from "react";
import Link from "next/link";

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
          <Link href="/sign-up">
            <button className="uppercase">Signup</button>
          </Link>
          <div className="via-foreground h-full w-[1px] self-stretch bg-gradient-to-b from-transparent to-transparent"></div>
          <Link href="/sign-in">
            <button className="uppercase">Login</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default DesktopNav;
