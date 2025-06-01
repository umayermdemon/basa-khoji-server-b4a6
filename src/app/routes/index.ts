import { Router } from "express";
import { AuthRouter } from "../modules/Auth/auth.route";
import { UserRouter } from "../modules/User/user.route";
import { AdminRouter } from "../modules/Admin/admin.route";
import { RentalHouseRouter } from "../modules/Rental-House/rental-house.route";
import { TenantsRouter } from "../modules/Requests/tenants.route";
import { BlogRouter } from "../modules/Blog/blog.route";

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
    path: "/rental-house",
    route: RentalHouseRouter,
  },
  {
    path: "/rental-request",
    route: TenantsRouter,
  },
  {
    path: "/blogs",
    route: BlogRouter,
  },
];

routes.forEach(route => router.use(route.path, route.route));

export default router;
