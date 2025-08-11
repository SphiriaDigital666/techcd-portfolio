import React from "react";
import { useFormContext, useFormState } from "react-hook-form";
import { ContactFormType } from "@/lib/validation";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import { countryData } from "@/lib/constants";

const selectData = countryData.map(({ code, name }) => ({
  value: code,
  placeholder: name,
}));

const DeliverySubForm = () => {
  const { register, setValue } = useFormContext<ContactFormType>();

  const { errors } = useFormState<ContactFormType>({
    name: [
      "firstName",
      "lastName",
      "address",
      "apartment",
      "city",
      "zip",
      "tel",
    ],
    exact: true,
  });

  return (
    <>
      <p className="mb-[0.6em] text-[15px] font-medium sm:text-[18px] md:text-[22px] lg:text-[25px] xl:text-[28px] 2xl:text-[31px]">
        Delivery
      </p>

      <FormSelect
        id="country"
        name="country"
        placeholder="Country/Region"
        content={selectData}
        onValueChange={(value) => {
          setValue("country", value, {
            shouldDirty: true,
            shouldValidate: true,
            shouldTouch: true,
          });
        }}
        error={errors.country?.message}
      />

      <div className="col-span-full grid grid-cols-2 gap-[1.5em]">
        <FormInput
          type="text"
          id="firstName"
          {...register("firstName")}
          placeholder="First name"
          error={errors.firstName?.message}
        />
        <FormInput
          type="text"
          id="lastName"
          {...register("lastName")}
          placeholder="Last name"
          error={errors.lastName?.message}
        />
      </div>

      <FormInput
        type="text"
        id="address"
        {...register("address")}
        placeholder="Address"
        error={errors.address?.message}
      />

      <FormInput
        type="text"
        id="apartment"
        {...register("apartment")}
        placeholder="Apartment, suite, etc. (optional)"
        error={errors.apartment?.message}
      />

      <FormInput
        type="text"
        id="city"
        {...register("city")}
        placeholder="City"
        error={errors.city?.message}
      />

      <div className="col-span-full grid grid-cols-2 gap-[1.5em]">
        <FormInput
          type="text"
          id="state"
          {...register("state")}
          placeholder="State"
          error={errors.state?.message}
        />
        <FormInput
          type="text"
          id="zip"
          {...register("zip")}
          placeholder="Postal code"
          error={errors.zip?.message}
        />
      </div>

      <FormInput
        type="tel"
        id="tel"
        {...register("tel")}
        placeholder="Phone"
        error={errors.tel?.message}
      />
    </>
  );
};

export default DeliverySubForm;
