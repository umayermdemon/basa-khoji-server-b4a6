import AppError from "../../errors/AppError";
import { TCustomer } from "../Customer/customer.interface";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status";
import { generatedCustomerId, generatedCustomerRegNo } from "./user.utils";
import mongoose from "mongoose";
import { Customer } from "../Customer/customer.model";
import config from "../../config";
const CreateCustomerIntoDb = async (password: string, payload: TCustomer) => {
  const user: Partial<IUser> = {};
  user.userId = await generatedCustomerId();
  user.role = "customer";
  user.email = payload?.owner?.email;
  user.password = password || config.default_password;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }

    payload.userID = newUser[0].userId;
    payload.registrationNumber = await generatedCustomerRegNo();
    payload.user = newUser[0]._id;

    const newCustomer = await Customer.create([payload], { session });
    if (!newCustomer.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create customer");
    }
    await session.commitTransaction();
    await session.endSession();
    return newCustomer;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, err);
  }
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
  CreateCustomerIntoDb,
  GetAllUserFromDb,
  GetSingleUserFromDb,
};
