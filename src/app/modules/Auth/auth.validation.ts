import { z } from "zod";

const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email address is required" })
      .email({ message: "Invalid type of email" }),
    password: z
      .string()
      .min(6, { message: "Password must contain at least 6 character(s)" })
      .max(20, { message: "Password must contain at most 20 character(s)" }),
  }),
});

export const AuthValidations = { loginValidationSchema };
