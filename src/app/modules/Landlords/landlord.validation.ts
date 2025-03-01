import { z } from "zod";

const listingValidationSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    location: z.object({
      city: z.string().min(2, "City is required"),
      state: z.string().min(2, "State is required"),
      country: z.string().min(2, "Country is required"),
      zipCode: z.string().optional(),
      address: z.string().optional(),
    }),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters long"),
    rentAmount: z.number().positive("Rent amount must be a positive number"),
    bedrooms: z.number().int().positive("Bedrooms must be a positive integer"),
    bathrooms: z
      .number()
      .int()
      .positive("Bathrooms must be a positive integer"),
    images: z
      .array(z.string().url("Each image must be a valid URL"))
      .min(1, "At least one image is required"),
    landlordId: z.string().min(1, "Landlord ID is required"),
    availableFrom: z.string().refine(date => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    }),
    amenities: z.array(z.string()).optional(),
    isAvailable: z.boolean(),
  }),
});

export const ListingValidations = { listingValidationSchema };
