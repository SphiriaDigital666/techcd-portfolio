"use client";

import React from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoArrowUpRight } from "react-icons/go";

import FormInput from "./FormInput";
import { CredentialNameFormSchema, CredentialNameType } from "@/lib/validation";
import { cn } from "@/lib/utils";

const CredentialForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<CredentialNameType>({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: zodResolver(CredentialNameFormSchema),
    defaultValues: { firstName: "John", lastName: "Doe" },
  });

  const onSubmit = async (data: CredentialNameType) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="text-[12px] sm:text-[13px] md:text-[15px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]"
    >
      <FormInput
        type="text"
        id="studentFirstName"
        label="First Name"
        {...register("firstName")}
        error={errors.firstName?.message}
      />
      <FormInput
        type="text"
        id="studentLastName"
        label="Last Name"
        {...register("lastName")}
        error={errors.lastName?.message}
      />

      <div className="relative">
        <button
          type="button"
          className="text-primary absolute top-0 right-0 z-[1] flex items-center"
        >
          <span>Change e-mail address</span> <GoArrowUpRight />
        </button>
        <FormInput
          id="email"
          label="Email"
          value="john@doe.com"
          readOnly
          className="cursor-not-allowed"
        />
      </div>

      <div className="relative">
        <button
          type="button"
          className="text-primary absolute top-0 right-0 z-[1] flex items-center"
        >
          <span>Change username</span> <GoArrowUpRight />
        </button>
        <FormInput
          id="username"
          label="Username"
          value="john-doe"
          readOnly
          className="cursor-not-allowed"
        />
      </div>

      <div className="relative">
        <button
          type="button"
          className="text-primary absolute top-0 right-0 z-[1] flex items-center"
        >
          <span>Change password</span> <GoArrowUpRight />
        </button>
        <FormInput
          id="password"
          label="Password"
          value="••••••••"
          readOnly
          className="cursor-not-allowed"
        />
      </div>

      <div className="relative">
        <button
          type="button"
          className="text-primary absolute top-0 right-0 z-[1] flex items-center"
        >
          <span>Change phone number</span> <GoArrowUpRight />
        </button>
        <FormInput
          id="tel"
          label="Phone number"
          value="+94789387463"
          readOnly
          className="cursor-not-allowed"
        />
      </div>

      <div className="relative">
        <button
          type="button"
          className="text-primary absolute top-0 right-0 z-[1] flex items-center"
        >
          <span>Change</span> <GoArrowUpRight />
        </button>
        <FormInput
          id="auth"
          label="2 Factor Authentication"
          value="none"
          readOnly
          className="cursor-not-allowed"
        />
      </div>

      <button
        className={cn(
          "bg-primary pointer-events-none ms-auto flex w-fit items-center gap-[0.5em] rounded-[0.5em] px-[1em] py-[0.5em] opacity-0 transition-opacity",
          isDirty && "pointer-events-auto opacity-100",
        )}
        disabled={isSubmitting}
      >
        <span>{isSubmitting ? "Saving" : "Save Changes"}</span>
        <GoArrowUpRight />
      </button>
    </form>
  );
};

export default CredentialForm;
