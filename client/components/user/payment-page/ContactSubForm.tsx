import React from "react";
import { useFormContext, useFormState } from "react-hook-form";
import { ContactFormType } from "@/lib/validation";
import FormInput from "./FormInput";

const ContactSubForm = () => {
  const { register } = useFormContext<ContactFormType>();

  const { errors } = useFormState<ContactFormType>({
    name: ["email"],
    exact: true,
  });

  return (
    <>
      <p className="mb-[0.6em] text-[15px] font-medium sm:text-[18px] md:text-[22px] lg:text-[25px] xl:text-[28px] 2xl:text-[31px]">
        Contact
      </p>
      <FormInput
        type="email"
        id="email"
        {...register("email")}
        placeholder="Email address"
        error={errors.email?.message}
      />
    </>
  );
};

export default ContactSubForm;
