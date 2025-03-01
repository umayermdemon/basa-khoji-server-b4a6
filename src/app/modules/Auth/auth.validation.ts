import { z } from "zod";

const loginValidationSchema = z.object({
  body: z
    .object({
      email: z
        .string({ required_error: "Email address is required" })
        .email({ message: "Invalid email address" })
        .optional(),
      userName: z
        .string({ required_error: "Username is required" })
        .min(3, { message: "Username must contain at least 3 characters" })
        .optional(),
      password: z
        .string()
        .min(6, { message: "Password must contain at least 6 characters" })
        .max(20, { message: "Password must contain at most 20 characters" }),
    })
    .refine(data => data.email || data.userName, {
      message: "Either email or username is required",
      path: ["email", "userName"],
    }),
});

export const AuthValidations = { loginValidationSchema };
