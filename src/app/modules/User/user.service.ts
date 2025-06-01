import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import { authServices } from "../Auth/auth.service";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status";
import { RentalHouseListing } from "../Rental-House/rental-house.model";
const CreateUserIntoDb = async (payload: IUser) => {
  const email = payload?.email;
  const userName = payload?.userName;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const isExistUser = await User.findOne({ email }).session(session);
    if (isExistUser) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "This user is already registered. Please log in.",
      );
    }
    const isExistUserName = await User.findOne({ userName });
    if (isExistUserName) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "This user name is already used. Please try another.",
      );
    }
    const newUser = await User.create([payload], { session });
    if (!newUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "User created failed");
    }
    await session.commitTransaction();
    await session.endSession();
    return authServices.loginUser({
      email: newUser[0]?.email,
      password: payload?.password as string,
    });
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, error?.message);
  }
};
const GetSingleUserFromDb = async (id: string) => {
  const result = await User.findById(id);
  return result;
};
// get me
const getMe = async (email: string) => {
  const result = await User.findOne({ email });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  return result;
};

export const UserServices = {
  CreateUserIntoDb,
  getMe,
  GetSingleUserFromDb,
};
