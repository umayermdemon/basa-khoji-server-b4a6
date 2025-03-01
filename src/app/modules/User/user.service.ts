import AppError from "../../errors/AppError";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status";
import mongoose from "mongoose";
import config from "../../config";
const CreateUserIntoDb = async (payload: IUser) => {
  const email = payload?.email;
  const isExistUser = await User.findOne({ email });
  if (isExistUser) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This user is already registered. Please log in.",
    );
  }
  const newUser = await User.create(payload);
  if (!newUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "User created failed");
  }
  return newUser;
};
const GetAllUserFromDb = async () => {
  const user = await User.find();
  return user;
};
const GetSingleUserFromDb = async (userId: string) => {
  const user = await User.findOne({ userId });
  return user;
};

export const UserServices = {
  CreateUserIntoDb,
  GetAllUserFromDb,
  GetSingleUserFromDb,
};
