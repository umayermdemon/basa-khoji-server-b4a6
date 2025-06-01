import status from "http-status";
import AppError from "../../errors/AppError";
import { IBlog } from "./blog.interface";
import { BlogModel } from "./blog.model";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../User/user.model";

const createBlog = async (payload: IBlog, currentUser: JwtPayload) => {
  const isExistUser = await User.isUserExistsByEmail(currentUser?.email);
  if (!isExistUser) {
    throw new AppError(status.UNAUTHORIZED, "User not found");
  }
  const isExist = await BlogModel.findOne({ title: payload.title });
  if (isExist) {
    throw new AppError(
      status.BAD_REQUEST,
      "Blog with this title already exists",
    );
  }
  const result = await BlogModel.create({
    ...payload,
    author: isExistUser?._id,
  });
  return result;
};
const getAllBlogs = async () => {
  const result = await BlogModel.find();
  return result;
};

const getPublishedBlogs = async () => {
  const result = await BlogModel.find({ isPublished: true, isDeleted: false });
  if (!result || result.length === 0) {
    throw new AppError(status.NOT_FOUND, "No published blogs found");
  }
  return result;
};

const getSingleBlog = async (id: string) => {
  const result = await BlogModel.findById(id);
  if (!result) {
    throw new AppError(status.NOT_FOUND, "Blog not found");
  }
  return result;
};

const updateBlog = async (id: string, updatedData: Partial<IBlog>) => {
  const { isDeleted, isPublished, ...allowedUpdates } = updatedData;
  const existingBlog = await BlogModel.findById(id);
  if (!existingBlog || existingBlog.isDeleted) {
    throw new AppError(status.NOT_FOUND, "Blog not found or has been deleted");
  }

  const result = await BlogModel.findByIdAndUpdate(id, allowedUpdates, {
    new: true,
    runValidators: true,
  });
  return result;
};

const softDeleteBlog = async (id: string) => {
  const existingBlog = await BlogModel.findById(id);
  if (!existingBlog) {
    throw new AppError(status.NOT_FOUND, "Blog not found");
  }

  const result = await BlogModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

const hardDeleteBlog = async (id: string) => {
  const existingBlog = await BlogModel.findById(id);
  if (!existingBlog) {
    throw new AppError(status.NOT_FOUND, "Blog not found");
  }

  await BlogModel.findByIdAndDelete(id);
  return existingBlog;
};

export const BlogServices = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  getPublishedBlogs,
  softDeleteBlog,
  hardDeleteBlog,
};
