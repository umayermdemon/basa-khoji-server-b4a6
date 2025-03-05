/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { verifyToken } from "../modules/Auth/auth.utils";
import { TUserRole } from "../modules/User/user.interface";
import { User } from "../modules/User/user.model";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req?.headers?.authorization;

    // check the token sent from client
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }

    // verify the token

    let decoded;
    try {
      decoded = verifyToken(token, config.jwt_access_token as string);
    } catch (err) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }

    const { role, email } = decoded;

    const user = await User.isUserExistsByEmail(email);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
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

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
