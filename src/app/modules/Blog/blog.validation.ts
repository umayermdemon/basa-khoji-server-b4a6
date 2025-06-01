import { z } from "zod";

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    tags: z.array(z.string()).optional(),
    coverImageUrl: z.string().url().optional(),
    isPublished: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const updateBlogValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required").optional(),
    content: z.string().min(1, "Content is required").optional(),
    tags: z.array(z.string()).optional(),
    coverImageUrl: z.string().url().optional(),
  }),
});

export const BlogValidation = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};
