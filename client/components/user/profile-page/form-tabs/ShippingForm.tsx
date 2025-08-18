"use client";

import React from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoArrowUpRight } from "react-icons/go";

import FormInput from "./FormInput";
import { ShippingFormSchema, ShippingType } from "@/lib/validation";

const ShippingForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ShippingType>({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: zodResolver(ShippingFormSchema),
  });

  const onSubmit = async (data: ShippingType) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="text-[12px] sm:text-[13px] md:text-[15px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]"
    >
      <div className="grid grid-cols-1 gap-[1.5em] lg:grid-cols-2">
        <FormInput
          type="text"
          id="firstName"
          label="First Name"
          {...register("firstName")}
          error={errors.firstName?.message}
        />
        <FormInput
          type="text"
          id="lastName"
          label="Last Name"
          {...register("lastName")}
          error={errors.lastName?.message}
        />
      </div>

      <div className="grid grid-cols-1 gap-[1.5em] lg:grid-cols-2">
        <FormInput
          type="tel"
          id="tel"
          label="Phone Number"
          {...register("tel")}
          error={errors.tel?.message}
        />
        <FormInput
          type="email"
          id="email"
          label="Email Address"
          {...register("email")}
          error={errors.email?.message}
        />
      </div>

      <FormInput
        type="text"
        id="address"
        label="Address"
        {...register("address")}
        error={errors.address?.message}
      />

      <div className="grid grid-cols-1 gap-[1.5em] lg:grid-cols-2">
        <FormInput
          type="text"
          id="apartment"
          label="Apartment (optional)"
          {...register("apartment")}
          error={errors.apartment?.message}
        />
        <FormInput
          type="text"
          id="city"
          label="City"
          {...register("city")}
          error={errors.city?.message}
        />
      </div>

      <div className="grid grid-cols-1 gap-[1.5em] lg:grid-cols-2">
        <FormInput
          type="text"
          id="state"
          label="State or Province"
          {...register("state")}
          error={errors.state?.message}
        />
        <FormInput
          type="text"
          id="zip"
          label="Zip code"
          {...register("zip")}
          error={errors.zip?.message}
        />
      </div>

      <button
        className="bg-primary ms-auto flex w-fit items-center gap-[0.5em] rounded-[0.5em] px-[1em] py-[0.5em]"
        disabled={isSubmitting}
      >
        <span>{isSubmitting ? "Saving" : "Save Changes"}</span>
        <GoArrowUpRight />
      </button>
    </form>
  );
};

export default ShippingForm;
