"use client";

import React, { useState } from "react";
import PriceFilter from "./PriceFilter";
import MobilePlanDescription from "./MobilePlanDescription";
import FeatureComparisonTable from "./FeatureComparisonTable";

const SectionContent = () => {
  const [isPricingAnnual, setIsPricingAnnual] = useState(false);

  return (
    <>
      <PriceFilter
        isPricingAnnual={isPricingAnnual}
        handleClick={setIsPricingAnnual}
      />
      <MobilePlanDescription />
      <FeatureComparisonTable />
    </>
  );
};

export default SectionContent;
