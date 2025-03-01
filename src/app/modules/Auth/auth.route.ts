import { Router } from "express";
import { authControllers } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidations } from "./auth.validation";

const router = Router();

router.post(
  "/login",
  validateRequest(AuthValidations.loginValidationSchema),
  authControllers.loginUser,
);

export const AuthRouter = router;
