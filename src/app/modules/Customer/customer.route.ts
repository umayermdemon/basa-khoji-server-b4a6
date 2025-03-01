import { Router } from "express";
import { customerControllers } from "./customer.controller";

const router = Router();

router.get("/", customerControllers.getAllCustomer);

export const CustomerRouter = router;
