import * as z from "zod";

export const ContactFormSchema = z.object({
  firstName: z.string({ message: "This field is required" }).min(1, {
    message: "This field is required",
  }),
  lastName: z.string({ message: "This field is required" }).min(1, {
    message: "This field is required",
  }),
  email: z
    .string({ message: "This field is required" })
    .min(1, {
      message: "This field is required",
    })
    .email({
      message: "Invalid format",
    }),
  tel: z
    .string({ message: "This field is required" })
    .min(1, {
      message: "This field is required",
    })
    .regex(/^\+?[1-9]\d{1,14}$/, {
      message:
        "Invalid format. Please enter a valid phone number in international format (e.g., +1234567890).",
    }),
  message: z
    .string({ message: "This field is required" })
    .min(1, {
      message: "This field is required",
    })
    .min(20, {
      message: "Message too short",
    })
    .max(400, {
      message: "Message too long",
    }),
});

export type ContactFormType = z.infer<typeof ContactFormSchema>;
