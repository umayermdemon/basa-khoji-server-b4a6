import { z } from "zod";

const userStatusUpdateValidationSchema = z.object({
  body: z.object({
    status: z.enum(["active", "inactive", "suspended"], {
      required_error: "Status required for update",
    }),
  }),
});

export const AdminValidations = { userStatusUpdateValidationSchema };
