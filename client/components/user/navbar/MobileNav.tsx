import React from "react";
import Link from "next/link";

import { LiaShoppingBagSolid } from "react-icons/lia";
import { FaRegUser } from "react-icons/fa6";

import { navLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";

type MobileNavProps = {
  getActiveLinkClasses: (href: string) => string;
  handleCloseMobileNav: () => void;
  mobileNavBgRef: React.RefObject<HTMLDivElement | null>;
  mobileNavListRef: React.RefObject<HTMLUListElement | null>;
  mobileNavOverlayRef: React.RefObject<HTMLDivElement | null>;
  mobileNavRef: React.RefObject<HTMLElement | null>;
};

const MobileNav: React.FC<MobileNavProps> = ({
  getActiveLinkClasses,
  handleCloseMobileNav,
  mobileNavBgRef,
  mobileNavListRef,
  mobileNavOverlayRef,
  mobileNavRef,
}) => {
  return (
    <>
      {/* Mobile nav overlay */}
      <div
        ref={mobileNavOverlayRef}
        className="fixed inset-0 -z-[1] hidden bg-black/30 opacity-0 lg:hidden"
        onClick={handleCloseMobileNav}
      ></div>

      {/* Mobile nav */}
      <nav
        ref={mobileNavRef}
        className="text-foreground fixed right-0 bottom-0 left-0 hidden max-h-[70dvh] overflow-hidden rounded-t-[2em] px-[2em] py-[3em] text-[20px] sm:text-[21px] md:text-[23px] lg:hidden"
      >
        {/* Gradient bg */}
        <div
          ref={mobileNavBgRef}
          className="bg-background dark:from-background from-background absolute inset-0 -z-[1] bg-gradient-to-bl to-[#0A2A4A]"
          style={{ clipPath: "circle(0% at 50% 100%)" }}
        ></div>

        {/* Nav links */}
        <ul
          ref={mobileNavListRef}
          className="flex grow flex-col gap-[2em] overflow-hidden pr-[8px]"
        >
          {navLinks.map(({ href, placeholder }) => (
            <li key={href} className="text-center">
              <Link
                href={href}
                className={cn("w-fit", getActiveLinkClasses(href))}
              >
                {placeholder}
              </Link>
              <hr className="border-t-foreground mt-[0.3em] opacity-20" />
            </li>
          ))}

          <div className="flex items-center justify-around">
            <ThemeToggle />

            {/* Sign in/up */}
            <li className="dark:text-primary text-background flex justify-center gap-[1em]">
              <Link href="/cart" className="hover:opacity-80 focus:opacity-80">
                <LiaShoppingBagSolid className="text-[1.5em]" />
              </Link>
              <Link
                href="/sign-in"
                className="hover:opacity-80 focus:opacity-80"
              >
                <FaRegUser className="text-[1.2em]" />
              </Link>
            </li>
          </div>
        </ul>
      </nav>
    </>
  );
};

export default MobileNav;
