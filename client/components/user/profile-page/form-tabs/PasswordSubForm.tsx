"use client";

import React from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoArrowUpRight } from "react-icons/go";
import { MdArrowBackIosNew } from "react-icons/md";

import { cn } from "@/lib/utils";
import {
  CredentialPasswordFormSchema,
  CredentialPasswordType,
} from "@/lib/validation";
import PasswordInput from "./PasswordInput";

const PasswordSubForm: React.FC<{ handleClose: () => void }> = ({
  handleClose,
}) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<CredentialPasswordType>({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: zodResolver(CredentialPasswordFormSchema),
  });

  const onSubmit = async (data: CredentialPasswordType) => {
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
        <PasswordInput
          id="password"
          label="Current Password"
          {...register("password")}
          error={errors.password?.message}
        />
        <PasswordInput
          id="new-password"
          label="New Password"
          {...register("newPassword")}
          error={errors.newPassword?.message}
        />
        <PasswordInput
          id="confirm-password"
          label="Confirm New Password"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />

        <button
          className="bg-primary pointer-events-none ms-auto flex w-fit items-center gap-[0.5em] rounded-[0.5em] px-[1em] py-[0.5em]"
          disabled={isSubmitting}
        >
          <span>{isSubmitting ? "Saving" : "Save Changes"}</span>
          <GoArrowUpRight />
        </button>
      </form>
    </>
  );
};

export default PasswordSubForm;
