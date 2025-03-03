import { z } from "zod";

const userValidationSchema = z.object({
  body: z.object({
    userName: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid type of email"),
    phoneNumber: z.string().regex(/^\+?\d{10,15}$/, "Invalid phone number"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["tenant", "landlord"]),
  }),
});

export const UserValidations = { userValidationSchema };
