import React from "react";
import Image from "next/image";

import SectionTitle from "./SectionTitle";
import HeaderContent from "./HeaderContent";
import eclipse from "@/public/images/eclipse.svg";

const Header = () => {
  return (
    <section className="relative overflow-hidden">
      <Image src={eclipse} alt="" className="absolute inset-0 w-full" />
      <div className="px-container relative container mx-auto pt-[8em]">
        <SectionTitle />
        <HeaderContent />
      </div>
    </section>
  );
};

export default Header;
