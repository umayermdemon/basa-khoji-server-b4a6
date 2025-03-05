import { z } from "zod";

const userValidationSchema = z.object({
  body: z.object({
    userName: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .regex(
        /^[A-Za-z]{3,}[A-Za-z0-9_]*$/,
        "Username must start with at least 3 letters",
      ),
    email: z.string().email("Invalid type of email"),
    phoneNumber: z.string().regex(/^\+?\d{10,15}$/, "Invalid phone number"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["tenant", "landlord"]),
  }),
});

export const UserValidations = { userValidationSchema };
