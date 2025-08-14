import React from "react";
import { GoArrowUpRight } from "react-icons/go";
import FormInput from "./FormInput";

const CredentialForm = () => {
  return (
    <form className="text-[12px] sm:text-[13px] md:text-[15px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
      <FormInput label="First Name" />
      <FormInput label="Last Name" />
      <FormInput label="Email" />
      <FormInput label="Username" />
      <FormInput label="Password" />
      <FormInput label="Phone number" />
      <FormInput label="2 Factor Authentication" />

      <button className="bg-primary ms-auto flex w-fit items-center gap-[0.5em] rounded-[0.5em] px-[1em] py-[0.5em]">
        <span>Save Changes</span> <GoArrowUpRight />
      </button>
    </form>
  );
};

export default CredentialForm;
