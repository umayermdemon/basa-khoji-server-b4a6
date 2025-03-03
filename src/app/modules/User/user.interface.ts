/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { userRole } from "../Auth/auth.const";

export interface IUser {
  userName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: "tenant" | "landlord";
  status: "active" | "inactive" | "suspended";
}

export interface UserModel extends Model<IUser> {
  isUserExistsByEmail(emailOrUserName: string): Promise<IUser>;
}

export type TUserRole = keyof typeof userRole;
