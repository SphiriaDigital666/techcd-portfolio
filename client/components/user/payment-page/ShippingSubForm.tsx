import React from "react";

const ShippingSubForm = () => {
  return (
    <>
      <p className="mb-[0.6em] text-[15px] font-medium sm:text-[18px] md:text-[22px] lg:text-[25px] xl:text-[28px] 2xl:text-[31px]">
        Shipping method
      </p>
      <div className="border-foreground/15 mb-[2em] flex justify-between rounded-[0.5em] border p-[1em]">
        <div>
          <p>Standard</p>
          <p className="text-foreground/40">2-3 Business Days</p>
        </div>
        <p>Rs 400.00</p>
      </div>
    </>
  );
};

export default ShippingSubForm;
