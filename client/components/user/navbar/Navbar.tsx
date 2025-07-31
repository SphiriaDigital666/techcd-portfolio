"use client";

import React, { useRef, useState } from "react";
import { usePathname } from "next/navigation";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import NavMenuIcon from "../icons/NavMenuIcon";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";

gsap.registerPlugin(useGSAP);

const Navbar = () => {
  const activePath = usePathname();
  const containerRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<GSAPTimeline>(null);

  const mobileNavOverlayRef = useRef<HTMLDivElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);

  const mobileNavBgRef = useRef<HTMLDivElement>(null);
  const mobileNavListRef = useRef<HTMLUListElement>(null);

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const { contextSafe } = useGSAP(
    () => {
      if (
        !mobileNavOverlayRef.current ||
        !mobileNavBgRef.current ||
        !mobileNavListRef.current
      )
        return;

      const tl = gsap
        .timeline({ paused: true })
        .to(mobileNavOverlayRef.current, {
          opacity: 1,
          ease: "none",
          duration: 0.7,
        })
        .to(
          mobileNavBgRef.current,
          {
            clipPath: "circle(120% at 50% 100%)",
            ease: "none",
            duration: 0.7,
          },
          "<",
        )
        .from(mobileNavListRef.current.children, {
          opacity: 0,
          yPercent: 100,
          stagger: 0.1,
        });
      timelineRef.current = tl;
    },
    { scope: containerRef },
  );

  const getActiveLinkClasses = (href: string) => {
    const classes = "text-background dark:text-primary lg:text-primary";

    if (activePath === "/" && href === "/") return classes;
    if (activePath !== "/" && href !== "/" && activePath.includes(href))
      return classes;

    return "hover:text-[#00BDFF]";
  };

  const toggleMobileNav = contextSafe(() => {
    const tl = timelineRef.current;
    const overlay = mobileNavOverlayRef.current;
    const nav = mobileNavRef.current;
    const list = mobileNavListRef.current;

    if (!tl || !overlay || !nav || !list) return;

    const htmlElement = document.documentElement;
    htmlElement.classList.toggle("overflow-hidden");

    if (!isMobileNavOpen) {
      overlay.classList.remove("hidden");
      nav.classList.replace("hidden", "flex");
      tl.play().eventCallback("onComplete", () => {
        list.classList.replace("overflow-hidden", "overflow-auto");
      });
    } else {
      list.classList.replace("overflow-auto", "overflow-hidden");
      tl.reverse().eventCallback("onReverseComplete", () => {
        overlay.classList.add("hidden");
        nav.classList.replace("flex", "hidden");
      });
    }

    setIsMobileNavOpen((prev) => !prev);
  });

  const closeMobileNav = contextSafe(() => {
    const tl = timelineRef.current;
    const overlay = mobileNavOverlayRef.current;
    const nav = mobileNavRef.current;
    const list = mobileNavListRef.current;

    if (!tl || !overlay || !nav || !list) return;

    const htmlElement = document.documentElement;
    htmlElement.classList.remove("overflow-hidden");

    list.classList.replace("overflow-auto", "overflow-hidden");
    tl.reverse().eventCallback("onReverseComplete", () => {
      overlay.classList.add("hidden");
      nav.classList.replace("flex", "hidden");
    });

    setIsMobileNavOpen((prev) => !prev);
  });

  return (
    <section
      ref={containerRef}
      className="absolute top-[1.5em] right-0 left-0 z-50"
    >
      <div className="px-container container mx-auto flex items-center justify-between">
        {/* Logo */}
        <p className="text-[20px] font-bold uppercase sm:text-[21px] md:text-[23px] lg:text-[24px] xl:text-[26px] 2xl:text-[27px]">
          Techcd
        </p>

        <DesktopNav getActiveLinkClasses={getActiveLinkClasses} />

        {/* Mobile nav toggle */}
        <button onClick={toggleMobileNav} className="lg:hidden">
          <NavMenuIcon className="w-[30px]" />
        </button>
      </div>

      <MobileNav
        getActiveLinkClasses={getActiveLinkClasses}
        handleCloseMobileNav={closeMobileNav}
        mobileNavBgRef={mobileNavBgRef}
        mobileNavListRef={mobileNavListRef}
        mobileNavOverlayRef={mobileNavOverlayRef}
        mobileNavRef={mobileNavRef}
      />
    </section>
  );
};

export default Navbar;
