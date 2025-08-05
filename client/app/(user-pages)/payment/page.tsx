import React from "react";
import Image from "next/image";

import eclipse from "@/public/images/eclipse.svg";
import PaymentForm from "@/components/user/payment-page/PaymentForm";

const PaymentPage = () => {
  return (
    <section className="relative py-[6em]">
      <Image src={eclipse} alt="" className="absolute inset-0 w-full" />
      <div className="from-primary absolute bottom-0 left-0 aspect-square w-2/5 -translate-x-1/2 rounded-full bg-radial to-transparent blur-[5em]"></div>

      <div className="px-container relative container mx-auto">
        <PaymentForm />
      </div>
    </section>
  );
};

export default PaymentPage;
