import { Router } from "express";
import { AdminControllers } from "./admin.controller";

const router = Router();

router.get("/users", AdminControllers.getAllUser);
router.put("/users/:id", AdminControllers.updateUserRole);
router.delete("/user/:id", AdminControllers.deleteUser);

export const AdminRouter = router;
