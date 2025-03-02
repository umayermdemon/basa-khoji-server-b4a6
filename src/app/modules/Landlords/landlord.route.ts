import { Router } from "express";
import { LandlordControllers } from "./landlord.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ListingValidations } from "./landlord.validation";
import { upload } from "../../utils/sendImageToCloudinary";
import { parseBody } from "../../middlewares/bodyParser";

const router = Router();

router.post(
  "/listings",
  upload.fields([{ name: "images" }]),
  parseBody,
  validateRequest(ListingValidations.listingValidationSchema),
  LandlordControllers.createListing,
);
router.get("/listings", LandlordControllers.getAllListing);
router.put("/listings/:id", LandlordControllers.updateListings);
router.delete("/listings/:id", LandlordControllers.deleteUser);

export const LandlordRouter = router;
