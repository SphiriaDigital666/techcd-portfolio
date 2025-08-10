import React from "react";
import Image from "next/image";

import shutterstock from "@/public/images/home-page/hero/shutterstock.svg";
import fiverr from "@/public/images/home-page/hero/fiverr.svg";
import bitcoin from "@/public/images/home-page/hero/bitcoin.svg";
import usd from "@/public/images/home-page/hero/usd.svg";
import usdt from "@/public/images/home-page/hero/usdt.svg";

const LogoImages: React.FC<{
  onImageLoad: () => void;
  playAnimation: boolean;
}> = ({ onImageLoad }) => {
  return (
    <div className="flex gap-[0.5em]">
      {/* 5 logo images */}
      <Image
        src={bitcoin}
        alt="Bitcoin Logo"
        priority
        onLoad={onImageLoad}
        className="w-[2em]"
      />
      <Image
        src={fiverr}
        alt="Fiverr Logo"
        priority
        onLoad={onImageLoad}
        className="w-[2em]"
      />
      <Image
        src={usd}
        alt="US Dollar Sign"
        priority
        onLoad={onImageLoad}
        className="w-[2em]"
      />
      <Image
        src={shutterstock}
        alt="Shutterstock Logo"
        priority
        onLoad={onImageLoad}
        className="w-[2em]"
      />
      <Image
        src={usdt}
        alt="USDT Logo"
        priority
        onLoad={onImageLoad}
        className="w-[2em]"
      />
    </div>
  );
};

export default LogoImages;
