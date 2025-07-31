import aliExpress from "@/public/images/home-page/about/ali-express.png";
import ezCash from "@/public/images/home-page/about/ez-cash.png";
import dialog from "@/public/images/home-page/about/dialog.png";
import binance from "@/public/images/home-page/about/binance.png";
import xm from "@/public/images/home-page/about/xm.png";
import xmDark from "@/public/images/home-page/about/xm-dark.png";
import slt from "@/public/images/home-page/about/slt.png";

// ----- ----- ----- NAV LINKS ----- ----- -----
export const navLinks = [
  {
    placeholder: "Home",
    href: "/",
  },
  {
    placeholder: "About",
    href: "/about",
  },
  {
    placeholder: "Products",
    href: "/products",
  },
  {
    placeholder: "Forum",
    href: "/forum",
  },
  {
    placeholder: "Blog",
    href: "/blog",
  },
  {
    placeholder: "Pricing",
    href: "/pricing",
  },
];

// ----- ----- ----- BRAND CAROUSEL DATA ----- ----- -----
export const brandCarouselData = [
  { id: "001", src: aliExpress, alt: "Ali Express" },
  { id: "002", src: ezCash, alt: "Ez Cash" },
  { id: "003", src: dialog, alt: "Dialog" },
  { id: "004", src: binance, alt: "Binance" },
  { id: "005", src: xm, alt: "XM" },
  { id: "006", src: xmDark, alt: "XM" },
  { id: "007", src: slt, alt: "SLT Mobitel" },
];

// ----- ----- ----- HERO IMAGE GLITCH KEYFRAMES ----- ----- -----
export const glitchOneClipPaths = [
  "inset(94% 0 4% 0)",
  "inset(35% 0 64% 0)",
  "inset(90% 0 7% 0)",
  "inset(69% 0 31% 0)",
  "inset(96% 0 4% 0)",
  "inset(35% 0 26% 0)",
  "inset(54% 0 12% 0)",
  "inset(38% 0 40% 0)",
  "inset(48% 0 3% 0)",
  "inset(64% 0 19% 0)",
  "inset(64% 0 4% 0)",
  "inset(96% 0 1% 0)",
  "inset(15% 0 38% 0)",
  "inset(62% 0 11% 0)",
  "inset(53% 0 8% 0)",
  "inset(2% 0 62% 0)",
  "inset(98% 0 3% 0)",
  "inset(75% 0 4% 0)",
  "inset(61% 0 10% 0)",
  "inset(3% 0 52% 0)",
  "inset(1% 0 72% 0)",
];

export const glitchTwoClipPaths = [
  "inset(45% 0 45% 0)",
  "inset(10% 0 85% 0)",
  "inset(83% 0 15% 0)",
  "inset(40% 0 45% 0)",
  "inset(12% 0 85% 0)",
  "inset(50% 0 45% 0)",
  "inset(91% 0 7% 0)",
  "inset(22% 0 76% 0)",
  "inset(68% 0 29% 0)",
  "inset(92% 0 6% 0)",
  "inset(80% 0 18% 0)",
  "inset(23% 0 74% 0)",
  "inset(75% 0 21% 0)",
  "inset(47% 0 50% 0)",
  "inset(16% 0 82% 0)",
  "inset(9% 0 88% 0)",
  "inset(99% 0 0% 0)",
  "inset(8% 0 88% 0)",
  "inset(54% 0 43% 0)",
  "inset(29% 0 67% 0)",
  "inset(77% 0 20% 0)",
];

export const glitchOpacityKeyframes = new Array(20).fill(1).concat(0);

// ----- ----- ----- PRICING SECTION GOD RAYS ----- ----- -----
export const rayClasses = [
  "mr-[3.178%] h-[72.657%] w-[5.527%]",
  "mr-[3.114%] h-[72.657%] w-[5.527%] bg-gradient-to-b from-[#0084F0]/40 to-transparent to-75%",
  "mr-[6.2%] h-[72.657%] w-[5.527%]",
  "mr-[2.751%] h-[72.657%] w-[2.142%] bg-gradient-to-b from-[#028EFC]/21 to-transparent",
  "mr-[2.751%] h-full w-[10.862%]",
  "mr-[5.93%] h-[64.96%] w-[20.308%]",
  "mr-[2.601%] h-[72.657%] w-[9.524%]",
  "mr-[1.591%] h-[72.657%] w-[3.261%]",
  "h-[66.816%] w-[9.801%]",
];
