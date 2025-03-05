import { Router } from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidations } from "./user.validation";
import { LandlordControllers } from "../Landlords/landlord.controller";
import auth from "../../middlewares/auth";

const router = Router();

router.post(
  "/create-user",
  validateRequest(UserValidations.userValidationSchema),
  UserControllers.createUser,
);
router.get("/listings", LandlordControllers.getAllRentalHouse);
// get me
router.get("/me", auth("admin", "landlord", "tenant"), UserControllers.getMe);

export const UserRouter = router;
