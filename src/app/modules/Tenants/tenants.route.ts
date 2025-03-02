import { Router } from "express";
import { TenantsControllers } from "./tenants.controller";
import validateRequest from "../../middlewares/validateRequest";
import { RentalRequestValidations } from "./tenants.validation";
import auth from "../../middlewares/auth";

const router = Router();

router.post(
  "/requests",
  auth("tenant"),
  validateRequest(RentalRequestValidations.rentalRequestValidationSchema),
  TenantsControllers.createRentalRequest,
);
router.get("/requests", auth("tenant"), TenantsControllers.getAllRentalRequest);
router.put("/profile", auth("tenant"), TenantsControllers.updateTenantsProfile);

export const TenantsRouter = router;
