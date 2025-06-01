import { Router } from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidations } from "./user.validation";
import auth from "../../middlewares/auth";

const router = Router();

router.post(
  "/create-user",
  validateRequest(UserValidations.userValidationSchema),
  UserControllers.createUser,
);

router.get("/:id", UserControllers.getSingleUser);

// get me
router.get("/me", auth("admin", "landlord", "tenant"), UserControllers.getMe);

export const UserRouter = router;
