"use client";

import React from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoArrowUpRight } from "react-icons/go";
import { MdArrowBackIosNew } from "react-icons/md";

import { cn } from "@/lib/utils";
import {
  CredentialEmailFormSchema,
  CredentialEmailType,
} from "@/lib/validation";
import { RadioGroup, RadioGroupItem } from "@/components/user/ui/RadioGroup";
import FormInput from "./FormInput";

const AuthSubForm: React.FC<{ handleClose: () => void }> = ({
  handleClose,
}) => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<CredentialEmailType>({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: zodResolver(CredentialEmailFormSchema),
    defaultValues: { email: "john@doe.com", password: "" },
  });

  const onSubmit = async (data: CredentialEmailType) => {
    console.log(data);
  };

  return (
    <>
      <div className="mb-[1em] flex items-center gap-[0.5em]">
        <button type="button" onClick={handleClose}>
          <MdArrowBackIosNew />
        </button>
        <p>Account Credential</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          "text-[12px] sm:text-[13px] md:text-[15px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]",
        )}
      >
        <RadioGroup
          defaultValue="auth-none"
          className="flex items-center gap-[1em] border-none"
        >
          <div className="flex items-center gap-[0.3em]">
            <RadioGroupItem value="auth-none" id="auth-none" />
            <label htmlFor="auth-none">None</label>
          </div>
          <div className="flex items-center gap-[0.3em]">
            <RadioGroupItem value="auth-email" id="auth-email" />
            <label htmlFor="auth-email">Email Verification</label>
          </div>
        </RadioGroup>
        <FormInput
          type="password"
          id="password"
          label="Password"
          {...register("password")}
          error={errors.password?.message}
        />

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
    </>
  );
};

export default AuthSubForm;
