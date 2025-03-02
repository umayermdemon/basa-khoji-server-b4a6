import { Types } from "mongoose";
import { z } from "zod";

const rentalRequestValidationSchema = z.object({
  body: z.object({
    listingId: z.string().refine(value => Types.ObjectId.isValid(value), {
      message: "Invalid listing ID",
    }),
    tenantId: z
      .string()
      .refine(value => Types.ObjectId.isValid(value), {
        message: "Invalid tenant ID",
      })
      .optional(),
    status: z.enum(["pending", "approved", "rejected"]).optional(),
    landlordPhone: z.string().optional(),
    paymentStatus: z.enum(["pending", "paid", "failed"]).optional(),
    additionalMessage: z.string().optional(),
  }),
});

export const RentalRequestValidations = {
  rentalRequestValidationSchema,
};
