import React from "react";
import PaymentFormInput from "./PaymentFormInput";

const PaymentForm = () => {
  return (
    <section className="relative py-[6em]">
      <div className="px-container container mx-auto">
        <div className="grid grid-cols-1 gap-[1.5em] lg:grid-cols-10">
          <div className="text-[12px] sm:text-[13px] md:text-[14px] lg:col-span-6 lg:text-[15px] xl:text-[16px] 2xl:text-[18px]">
            <p className="text-[15px] font-medium sm:text-[18px] md:text-[22px] lg:text-[25px] xl:text-[28px] 2xl:text-[31px]">
              Delivery Information
            </p>
            <div className="bg-foreground/10 mt-[1.5em] rounded-[0.5em] p-[1.5em]">
              <PaymentFormInput
                placeholder="Email"
                type="text"
                id="first-name"
              />
            </div>
          </div>
          <div className="text-[12px] sm:text-[13px] md:text-[14px] lg:col-span-4 lg:text-[15px] xl:text-[16px] 2xl:text-[18px]">
            <p className="text-[15px] font-medium sm:text-[18px] md:text-[22px] lg:text-[25px] xl:text-[28px] 2xl:text-[31px]">
              Order Summary
            </p>
            <div className="bg-foreground/10 mt-[1.5em] rounded-[0.5em] p-[1.5em]">
              <PaymentFormInput
                placeholder="Country/Region"
                type="text"
                id="first-name"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentForm;
