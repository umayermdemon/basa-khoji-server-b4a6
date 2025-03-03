import { Router } from "express";
import { AdminControllers } from "./admin.controller";
import auth from "../../middlewares/auth";

const router = Router();

router.get("/users", auth("admin"), AdminControllers.getAllUser);
router.put("/users/:id", auth("admin"), AdminControllers.updateUserRole);
router.delete("/user/:id", auth("admin"), AdminControllers.deleteUser);
router.get("/listings", auth("admin"), AdminControllers.getAllRentalHouse);
router.put("/listings/:id", AdminControllers.updateRentalHouse);

export const AdminRouter = router;
