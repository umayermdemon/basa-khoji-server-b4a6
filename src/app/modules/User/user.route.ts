import { Router } from "express";
import { userControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidations } from "./user.validation";

const router = Router();

router.post(
  "/create-user",
  validateRequest(UserValidations.userValidationSchema),
  userControllers.createUser,
);

export const UserRouter = router;
