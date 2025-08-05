import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/user/ui/RadioGroup";

const BillingSubForm = () => {
  return (
    <>
      <p className="mb-[0.6em] text-[15px] font-medium sm:text-[18px] md:text-[22px] lg:text-[25px] xl:text-[28px] 2xl:text-[31px]">
        Billing Address
      </p>

      <RadioGroup defaultValue="a">
        <div className="not-last:border-b-foreground/15 flex items-center gap-[0.5em] p-[1em] not-last:border-b">
          <RadioGroupItem value="a" id="a" />
          <label htmlFor="a">Same as shipping address</label>
        </div>
        <div className="flex items-center gap-[0.5em] p-[1em]">
          <RadioGroupItem value="b" id="b" />
          <label htmlFor="b">Use a different billing address</label>
        </div>
      </RadioGroup>
    </>
  );
};

export default BillingSubForm;
