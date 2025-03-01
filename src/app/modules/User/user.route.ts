import { Router } from "express";
import { userControllers } from "./user.controller";

const router = Router();

router.post("/create-customer", userControllers.createCustomer);
router.get("/", userControllers.getAllUser);
router.get("/:userId", userControllers.getSingleUser);

export const UserRouter = router;
