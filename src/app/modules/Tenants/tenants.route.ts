import { Router } from "express";
import { TenantsControllers } from "./tenants.controller";
import validateRequest from "../../middlewares/validateRequest";
import { TenantsValidations } from "./tenants.validation";
import auth from "../../middlewares/auth";

const router = Router();

router.post(
  "/requests",
  auth("tenant"),
  validateRequest(TenantsValidations.tenantsValidationSchema),
  TenantsControllers.createRentalRequest,
);
router.get("/requests", auth("tenant"), TenantsControllers.getAllRentalRequest);
router.put("/profile", auth("tenant"), TenantsControllers.updateTenantsProfile);

export const TenantsRouter = router;
