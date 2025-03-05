import { Router } from "express";
import { AdminControllers } from "./admin.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { AdminValidations } from "./admin.validation";

const router = Router();

router.get("/users", auth("admin"), AdminControllers.getAllUser);
router.put("/users/:id", auth("admin"), AdminControllers.updateUserRole);
router.put(
  "/user/status/:id",
  auth("admin"),
  validateRequest(AdminValidations.userStatusUpdateValidationSchema),
  AdminControllers.updateUserStatus,
);
router.delete("/user/:id", auth("admin"), AdminControllers.deleteUser);
router.get("/listings", auth("admin"), AdminControllers.getAllRentalHouse);
router.put("/listings/:id", AdminControllers.updateRentalHouse);

export const AdminRouter = router;
