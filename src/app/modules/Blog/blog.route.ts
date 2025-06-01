import { Router } from "express";
import { BlogController } from "./blog.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { BlogValidation } from "./blog.validation";

const router = Router();

router.post(
  "/create-blog",
  auth("admin", "landlord"),
  validateRequest(BlogValidation.createBlogValidationSchema),
  BlogController.createBlog,
);
router.get("/published-blogs", BlogController.getPublishedBlogs);
router.get("/", auth("admin"), BlogController.getAllBlogs);
router.get("/:id", BlogController.getSingleBlog);
router.put(
  "/:id",
  auth("admin"),
  validateRequest(BlogValidation.updateBlogValidationSchema),
  BlogController.updateBlog,
);

router.patch(
  "/:id/soft-delete",
  auth("admin", "landlord"),
  BlogController.softDeleteBlog,
);

router.delete("/:id/hard-delete", auth("admin"), BlogController.hardDeleteBlog);

export const BlogRouter = router;
