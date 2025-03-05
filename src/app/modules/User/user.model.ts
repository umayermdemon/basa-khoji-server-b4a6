import { model, Schema } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";
const userSchema = new Schema<IUser, UserModel>(
  {
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      trim: true,
      select: 0,
    },
    phoneNumber: { type: String, required: true },
    role: {
      type: String,
      enum: ["tenant", "landlord", "admin"],
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active",
    },
  },
  { timestamps: true },
);

// pre save middleware/ password bcrypt
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// post save middleware/ empty password
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

userSchema.statics.isUserExistsByEmail = async function (
  emailOrUserName: string,
) {
  return await User.findOne({
    $or: [{ email: emailOrUserName }, { userName: emailOrUserName }],
  }).select("+password");
};

export const User = model<IUser, UserModel>("User", userSchema);
