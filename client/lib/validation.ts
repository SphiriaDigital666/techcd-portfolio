import * as z from "zod";

// ----- ----- ----- START ----- ----- -----
export const PaymentFormSchema = z.object({
  email: z
    .email({ error: "Invalid format (e.g. john@doe.com)" })
    .min(1, "This field is required")
    .max(32, "Too long"),
  country: z
    .string({ message: "This field is required" })
    .min(1, "This field is required")
    .min(2, "Too short")
    .max(32, "Too long"),
  firstName: z
    .string({ message: "This field is required" })
    .min(1, "This field is required")
    .min(2, "Too short")
    .max(32, "Too long"),
  lastName: z
    .string({ message: "This field is required" })
    .min(1, "This field is required")
    .min(2, "Too short")
    .max(32, "Too long"),
  address: z
    .string({ message: "This field is required" })
    .min(1, "This field is required")
    .min(10, "Too short")
    .max(100, "Too long"),
  apartment: z
    .string({ message: "This field is required" })
    .max(100, "Too long")
    .optional()
    .or(z.literal("")),
  city: z
    .string({ message: "This field is required" })
    .min(1, "This field is required")
    .min(2, "Too short")
    .max(32, "Too long"),
  state: z
    .string({ message: "This field is required" })
    .min(1, "This field is required")
    .min(2, "Too short")
    .max(32, "Too long"),
  zip: z
    .string({ message: "This field is required" })
    .min(1, "This field is required")
    .regex(/^\d{5}(-\d{4})?$/, "Invalid format (e.g. 12345 or 12345-6789)"),
  tel: z
    .string({ message: "This field is required" })
    .min(1, "This field is required")
    .min(4, "Too short")
    .max(14, "Too long")
    .regex(/^\d+$/, "Invalid format (e.g. 790193748)"),
});
export type PaymentFormType = z.infer<typeof PaymentFormSchema>;

// ----- ----- ----- START ----- ----- -----
export const CredentialNameFormSchema = z.object({
  firstName: z
    .string({ message: "This field is required" })
    .min(1, "This field is required")
    .min(2, "Too short")
    .max(32, "Too long"),
  lastName: z
    .string({ message: "This field is required" })
    .min(1, "This field is required")
    .min(2, "Too short")
    .max(32, "Too long"),
});
export type CredentialNameType = z.infer<typeof CredentialNameFormSchema>;

// ----- ----- ----- START ----- ----- -----
export const CredentialTelFormSchema = z.object({
  tel: z
    .string({ message: "This field is required" })
    .min(1, "This field is required")
    .min(4, "Too short")
    .max(14, "Too long")
    .regex(/^\d+$/, "Invalid format (e.g. 790193748)"),
  password: z
    .string({ message: "This field is required" })
    .min(8, "Too short")
    .max(32, "Too long")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/\d/, "Must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
});

export type CredentialTelType = z.infer<typeof CredentialTelFormSchema>;

// ----- ----- ----- START ----- ----- -----
export const CredentialPasswordFormSchema = z
  .object({
    password: z
      .string({ message: "This field is required" })
      .min(8, "Too short")
      .max(32, "Too long")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/\d/, "Must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
    newPassword: z
      .string({ message: "This field is required" })
      .min(8, "Too short")
      .max(32, "Too long")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/\d/, "Must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
    confirmPassword: z
      .string({ message: "This field is required" })
      .min(8, "Too short")
      .max(32, "Too long")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/\d/, "Must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match",
  });
export type CredentialPasswordType = z.infer<
  typeof CredentialPasswordFormSchema
>;

// ----- ----- ----- START ----- ----- -----
export const CredentialUsernameFormSchema = z.object({
  username: z
    .string({ message: "This field is required" })
    .min(3, "Must be at least 3 characters")
    .max(32, "Must be at most 32 characters")
    .regex(
      /^[a-zA-Z][a-zA-Z0-9._]*$/,
      "Must start with a letter and contain only letters, numbers, dots, or underscores",
    )
    .regex(/^(?!.*[_.]{2})/, "Cannot contain consecutive dots or underscores")
    .regex(/^(?!.*[_.]$)/, "Cannot end with a dot or underscore"),
  password: z
    .string({ message: "This field is required" })
    .min(8, "Too short")
    .max(32, "Too long")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/\d/, "Must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
});
export type CredentialUsernameType = z.infer<
  typeof CredentialUsernameFormSchema
>;

// ----- ----- ----- START ----- ----- -----
export const CredentialEmailFormSchema = z.object({
  email: z
    .email({ error: "Invalid format (e.g. john@doe.com)" })
    .min(1, "This field is required")
    .max(32, "Too long"),
  password: z
    .string({ message: "This field is required" })
    .min(8, "Too short")
    .max(32, "Too long")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/\d/, "Must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
});
export type CredentialEmailType = z.infer<typeof CredentialEmailFormSchema>;
