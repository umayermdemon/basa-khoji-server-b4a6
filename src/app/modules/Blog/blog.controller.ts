import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BlogServices } from "./blog.service";

const createBlog = catchAsync(async (req, res) => {
  const result = await BlogServices.createBlog(req.body, req?.user);
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Blog post created successfully",
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await BlogServices.getAllBlogs();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Blogs retrieved successfully",
    data: result,
  });
});
const getPublishedBlogs = catchAsync(async (req, res) => {
  const result = await BlogServices.getPublishedBlogs();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Published blogs retrieved successfully",
    data: result,
  });
});
const getSingleBlog = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await BlogServices.getSingleBlog(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Blog retrieved successfully",
    data: result,
  });
});
const updateBlog = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await BlogServices.updateBlog(id, updatedData);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Blog updated successfully",
    data: result,
  });
});

const softDeleteBlog = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await BlogServices.softDeleteBlog(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Blog soft deleted successfully",
    data: result,
  });
});

const hardDeleteBlog = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await BlogServices.hardDeleteBlog(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Blog hard deleted successfully",
    data: result,
  });
});

export const BlogController = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  getPublishedBlogs,
  softDeleteBlog,
  hardDeleteBlog,
};
