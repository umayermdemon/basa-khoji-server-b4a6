import AppError from "../../errors/AppError";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status";
const CreateUserIntoDb = async (payload: IUser) => {
  const email = payload?.email;
  const userName = payload?.userName;
  const isExistUser = await User.findOne({ email });
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
  const newUser = await User.create(payload);
  if (!newUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "User created failed");
  }
  return newUser;
};

export const UserServices = {
  CreateUserIntoDb,
};
