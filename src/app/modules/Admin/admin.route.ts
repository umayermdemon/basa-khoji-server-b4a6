import { Router } from "express";
import { userControllers } from "./admin.controller";

const router = Router();

router.get("/users", userControllers.getAllUser);
router.put("/users/:id", userControllers.updateUserRole);

export const AdminRouter = router;
