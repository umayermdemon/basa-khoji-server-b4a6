import { model, Schema } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";
const userSchema = new Schema<IUser, UserModel>(
  {
    userId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: {
      type: String,
      required: true,
      trim: true,
      select: 0,
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "suspended", "pending"],
      default: "pending",
    },
    isDeleted: { type: Boolean, required: true, default: false },
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

userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select("+password");
};

export const User = model<IUser, UserModel>("User", userSchema);
