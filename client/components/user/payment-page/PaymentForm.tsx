"use client";

import React from "react";

import {
  FieldErrors,
  FormProvider,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ContactFormSchema, ContactFormType } from "@/lib/validation";
import ContactSubForm from "./ContactSubForm";
import DeliverySubForm from "./DeliverySubForm";
import ShippingSubForm from "./ShippingSubForm";
import PayMethodSubForm from "./PayMethodSubForm";
import BillingSubForm from "./BillingSubForm";
import OrderSummary from "./OrderSummary";

const PaymentForm = () => {
  const methods: UseFormReturn<ContactFormType> = useForm<ContactFormType>({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: zodResolver(ContactFormSchema),
  });

  const { handleSubmit } = methods;

  async function onSubmit(data: ContactFormType) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Form Data", data);
  }

  function onError(errors: FieldErrors) {
    console.log(errors);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="grid grid-cols-1 gap-[1.5em] lg:grid-cols-10"
    >
      <div className="text-[12px] sm:text-[13px] md:text-[14px] lg:col-span-6 lg:text-[15px] xl:text-[16px] 2xl:text-[18px]">
        <p className="text-[15px] font-medium sm:text-[18px] md:text-[22px] lg:text-[25px] xl:text-[28px] 2xl:text-[31px]">
          Delivery Information
        </p>
        <div className="bg-foreground/10 mt-[1.5em] rounded-[0.5em] p-[1.5em]">
          <FormProvider {...methods}>
            <ContactSubForm />
            <DeliverySubForm />
            <ShippingSubForm />
            <PayMethodSubForm />
            <BillingSubForm />
          </FormProvider>
        </div>
      </div>

      <div className="text-[12px] sm:text-[13px] md:text-[14px] lg:col-span-4 lg:text-[15px] xl:text-[16px] 2xl:text-[18px]">
        <p className="text-[15px] font-medium sm:text-[18px] md:text-[22px] lg:text-[25px] xl:text-[28px] 2xl:text-[31px]">
          Order Summary
        </p>
        <div className="bg-foreground/10 mt-[1.5em] rounded-[0.5em] p-[1.5em]">
          <OrderSummary />
        </div>
      </div>
    </form>
  );
};

export default PaymentForm;
