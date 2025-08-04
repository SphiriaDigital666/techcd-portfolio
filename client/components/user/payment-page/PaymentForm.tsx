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

let count = 0;

const PaymentForm = () => {
  count++;
  const methods: UseFormReturn<ContactFormType> = useForm<ContactFormType>({
    mode: "onBlur",
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
      <div className="col-span-full">
        <p className="text-[15px] font-medium sm:text-[18px] md:text-[22px] lg:text-[25px] xl:text-[28px] 2xl:text-[31px]">
          Render count: {count / 2}
        </p>
      </div>

      <div className="text-[12px] sm:text-[13px] md:text-[14px] lg:col-span-6 lg:text-[15px] xl:text-[16px] 2xl:text-[18px]">
        <p className="text-[15px] font-medium sm:text-[18px] md:text-[22px] lg:text-[25px] xl:text-[28px] 2xl:text-[31px]">
          Delivery Information
        </p>
        <div className="bg-foreground/10 mt-[1.5em] rounded-[0.5em] p-[1.5em]">
          <FormProvider {...methods}>
            <ContactSubForm />
          </FormProvider>
        </div>
      </div>

      <div className="text-[12px] sm:text-[13px] md:text-[14px] lg:col-span-4 lg:text-[15px] xl:text-[16px] 2xl:text-[18px]">
        <p className="text-[15px] font-medium sm:text-[18px] md:text-[22px] lg:text-[25px] xl:text-[28px] 2xl:text-[31px]">
          Order Summary
        </p>
        <div className="bg-foreground/10 mt-[1.5em] rounded-[0.5em] p-[1.5em]">
          <button>Submit</button>
        </div>
      </div>
    </form>
  );
};

export default PaymentForm;
