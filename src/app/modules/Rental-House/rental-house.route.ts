import { Router } from "express";
import { RentalHouseControllers } from "./rental-house.controller";
import validateRequest from "../../middlewares/validateRequest";
import { RentalHouseValidations } from "./rental-house.validation";
import { parseBody } from "../../middlewares/bodyParser";
import auth from "../../middlewares/auth";
import { multerUpload } from "../../config/multer.config";
import { UserControllers } from "../User/user.controller";

const router = Router();

router.post(
  "/listings",
  auth("landlord"),
  multerUpload.fields([{ name: "images" }]),
  parseBody,
  validateRequest(RentalHouseValidations.rentalHouseValidationSchema),
  RentalHouseControllers.createRentalHouse,
);
router.get("/listings", RentalHouseControllers.getAllRentalHouse);
router.get(
  "/listings/landlord",
  auth("landlord"),
  RentalHouseControllers.getAllRentalHouseFromDbByCreator,
);
router.get("/listings/:id", RentalHouseControllers.getSingleRentalHouse);
router.put(
  "/listings/:id",
  auth("landlord"),
  RentalHouseControllers.updateRentalHouse,
);
router.delete(
  "/listings/:id",
  auth("landlord"),
  RentalHouseControllers.deleteRentalHouse,
);
router.get(
  "/requests",
  auth("landlord"),
  RentalHouseControllers.getAllRentalRequestForLandlord,
);
router.put(
  "/requests/:id",
  auth("landlord"),
  RentalHouseControllers.acceptOrRejectRentalRequest,
);

export const RentalHouseRouter = router;
