import React from "react";
import { FaCcVisa } from "react-icons/fa";
import { RadioGroup, RadioGroupItem } from "@/components/user/ui/RadioGroup";

const PayMethodSubForm = () => {
  return (
    <>
      <p className="mb-[0.6em] text-[15px] font-medium sm:text-[18px] md:text-[22px] lg:text-[25px] xl:text-[28px] 2xl:text-[31px]">
        Payment
      </p>
      <p className="mb-[1em] font-light">
        All transactions are secure and encrypted.
      </p>

      <RadioGroup defaultValue="onepay">
        <div className="not-last:border-b-foreground/15 flex items-center gap-[0.5em] p-[1em] not-last:border-b">
          <RadioGroupItem value="onepay" id="onepay" />
          <label htmlFor="onepay">Credit / Debit Card Payments (onepay)</label>
        </div>
        <div className="flex items-center gap-[0.5em] p-[1em]">
          <RadioGroupItem value="card" id="card" />
          <label htmlFor="card">Credit card</label>
        </div>
      </RadioGroup>
    </>
  );
};

export default PayMethodSubForm;
