import { Router } from "express";
import { LandlordControllers } from "./landlord.controller";
import validateRequest from "../../middlewares/validateRequest";
import { RentalHouseValidations } from "./landlord.validation";
import { upload } from "../../utils/sendImageToCloudinary";
import { parseBody } from "../../middlewares/bodyParser";
import auth from "../../middlewares/auth";

const router = Router();

router.post(
  "/listings",
  auth("landlord"),
  upload.fields([{ name: "images" }]),
  parseBody,
  validateRequest(RentalHouseValidations.rentalHouseValidationSchema),
  LandlordControllers.createRentalHouse,
);
router.get(
  "/listings",
  auth("landlord"),
  LandlordControllers.getAllRentalHouse,
);
router.put(
  "/listings/:id",
  auth("landlord"),
  LandlordControllers.updateRentalHouse,
);
router.delete(
  "/listings/:id",
  auth("landlord"),
  LandlordControllers.deleteUser,
);
router.get(
  "/requests",
  auth("landlord"),
  LandlordControllers.getAllRentalHouseByLandlord,
);

export const LandlordRouter = router;
