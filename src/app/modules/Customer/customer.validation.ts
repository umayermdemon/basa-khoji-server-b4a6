import { z } from "zod";

const customerValidationSchema = z.object({
  body: z.object({
    companyName: z.string({ required_error: "Company name is required" }),
    businessType: z.string({ required_error: "Business type is required" }),

    owner: z.object({
      name: z.string({ required_error: "Owner name is required" }),
      email: z
        .string({ required_error: "Email is required" })
        .email({ message: "Invalid email format" }),
      phone: z.string({ required_error: "Phone number is required" }),
      image: z.string().optional(),
    }),

    address: z.object({
      street: z.string({ required_error: "Street is required" }),
      city: z.string({ required_error: "City is required" }),
      zipCode: z.string({ required_error: "Zip Code is required" }),
    }),

    socialMedia: z.object({
      facebook: z.string(),
      linkedin: z.string(),
      twitter: z.string(),
    }),

    status: z.enum(["active", "inactive", "suspended", "pending"], {
      required_error: "Status is required",
    }),

    expired_date: z
      .string({ required_error: "Expiration date is required" })
      .refine(val => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
      }),
  }),
});

export const CustomerValidations = {
  customerValidationSchema,
};
