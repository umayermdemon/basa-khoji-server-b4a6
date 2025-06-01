/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";
import { userRole } from "../Auth/auth.const";

export interface IUser {
  _id: Types.ObjectId;
  userName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: "tenant" | "landlord" | "admin";
  status: "active" | "inactive" | "suspended";
}

export interface UserModel extends Model<IUser> {
  isUserExistsByEmail(emailOrUserName: string): Promise<IUser>;
}

export type TUserRole = keyof typeof userRole;
