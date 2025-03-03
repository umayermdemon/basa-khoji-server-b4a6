import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import { authServices } from "../Auth/auth.service";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status";
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
    console.log({ isExistUserName });
    if (isExistUserName) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "This user name is already used. Please try another.",
      );
    }
    const newUser = await User.create([payload], { session });
    console.log({ newUser });
    if (!newUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "User created failed");
    }
    await session.commitTransaction();
    await session.endSession();
    return authServices.loginUser({
      email: newUser[0]?.email,
      password: payload?.password as string,
    });
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    console.log(error);
  }
};

export const UserServices = {
  CreateUserIntoDb,
};
