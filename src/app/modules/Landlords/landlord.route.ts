import { Router } from "express";
import { LandlordControllers } from "./landlord.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ListingValidations } from "./landlord.validation";

const router = Router();

router.post(
  "/listings",
  validateRequest(ListingValidations.listingValidationSchema),
  LandlordControllers.createListing,
);
router.get("/listings", LandlordControllers.getAllListing);
router.put("/listings/:id", LandlordControllers.updateListings);

export const LandlordRouter = router;
