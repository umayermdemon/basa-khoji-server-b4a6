/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export interface IUser {
  name: string;
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
