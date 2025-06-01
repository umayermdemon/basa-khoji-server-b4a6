import AppError from "../../errors/AppError";
import { User } from "../User/user.model";
import { TLoginUser } from "./auth.interface";
import { createToken } from "./auth.utils";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import config from "../../config";

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByEmail(
    (payload?.email as string) || (payload?.userName as string),
  );
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }

  if (payload?.email) {
    if (user?.email !== payload?.email) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Please provide valid email address!",
      );
    }
  }
  if (payload?.userName) {
    if (user?.userName !== payload?.userName) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Please provide valid user name!",
      );
    }
  }

  const isActive = user?.status;
  const statusMessages = {
    inactive: "This user account is inactive. Please contact support.",
    suspended: "This user account is suspended due to policy violations.",
  };
  if (statusMessages[isActive as keyof typeof statusMessages]) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      statusMessages[isActive as keyof typeof statusMessages],
    );
  }

  //   check password
  const isPasswordMatch = await bcrypt.compare(
    payload?.password,
    user?.password,
  );

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched");
  }
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
    status: user?.status,
    userName: user?.userName,
  };
  const role = user?.role;
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_expires_in as string,
  );

  return { accessToken, role };
};

export const authServices = { loginUser };
