import { Router } from "express";
import { userControllers } from "./admin.controller";

const router = Router();

router.get("/users", userControllers.getAllUser);
router.put("/users/:id", userControllers.updateUserRole);
router.delete("/user/:id", userControllers.deleteUser);

export const AdminRouter = router;
