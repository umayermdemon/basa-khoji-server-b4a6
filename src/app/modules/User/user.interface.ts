/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export interface IUser {
  userId: string;
  email: string;
  password: string;
  role: "customer" | "admin";
  status: "active" | "inactive" | "suspended" | "pending";
  isDeleted: boolean;
}

export interface UserModel extends Model<IUser> {
  isUserExistsByEmail(email: string): Promise<IUser>;
}
