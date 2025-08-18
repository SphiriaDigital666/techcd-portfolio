"use client";

import React from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import FormInput from "./FormInput";
import FormTextArea from "./FormTextArea";
import { ContactFormSchema, ContactType } from "@/lib/validation";

const FormArea = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ContactType>({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: zodResolver(ContactFormSchema),
  });

  const onSubmit = async (data: ContactType) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="text-[12px] sm:text-[13px] md:text-[15px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]"
    >
      <FormInput
        type="text"
        id="name"
        label="Name*"
        {...register("name")}
        error={errors.name?.message}
      />
      <FormInput
        type="text"
        id="email"
        label="Email*"
        {...register("email")}
        error={errors.email?.message}
      />
      <FormTextArea
        id="message"
        label="Message*"
        rows={6}
        {...register("message")}
        error={errors.message?.message}
      />

      <button
        className="bg-primary w-full rounded-[0.5em] px-[1em] py-[1em] text-center uppercase"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending" : "Send Message"}
      </button>
    </form>
  );
};

export default FormArea;
