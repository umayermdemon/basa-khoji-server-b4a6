import { Router } from "express";
import { AuthRouter } from "../modules/Auth/auth.route";
import { UserRouter } from "../modules/User/user.route";
import { AdminRouter } from "../modules/Admin/admin.route";
import { LandlordRouter } from "../modules/Landlords/landlord.route";
import { TenantsRouter } from "../modules/Tenants/tenants.route";

const router = Router();

const routes = [
  {
    path: "/auth",
    route: AuthRouter,
  },
  {
    path: "/users",
    route: UserRouter,
  },
  {
    path: "/admin",
    route: AdminRouter,
  },
  {
    path: "/landlords",
    route: LandlordRouter,
  },
  {
    path: "/tenants",
    route: TenantsRouter,
  },
];

routes.forEach(route => router.use(route.path, route.route));

export default router;
