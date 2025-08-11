import React from "react";
import Image from "next/image";

import bg from "@/public/images/pricing-page/pricing/bg.svg";
import SectionTitle from "./SectionTitle";
import PricingTabs from "./PricingTabs";
import Banner from "./Banner";

const Pricing = () => {
  return (
    <section className="relative overflow-x-hidden overflow-y-visible">
      <Image src={bg} alt="Vector" className="absolute inset-0 size-full" />

      <div className="px-container relative container mx-auto pt-[2em]">
        <SectionTitle />
        <PricingTabs />
      </div>

      <Banner />
    </section>
  );
};

export default Pricing;
