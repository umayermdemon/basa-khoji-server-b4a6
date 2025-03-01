import { model, Schema } from "mongoose";
import { TCustomer } from "./customer.interface";

const customerSchema = new Schema<TCustomer>(
  {
    companyName: { type: String, required: true },
    businessType: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "User",
    },
    owner: {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      phone: { type: String, required: true },
      image: { type: String, required: false },
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      zipCode: { type: String, required: true },
    },
    socialMedia: {
      facebook: { type: String, required: true },
      linkedin: { type: String, required: true },
      twitter: { type: String, required: true },
    },
    registrationNumber: { type: String, required: true, unique: true },
    userID: { type: String, required: true },
    status: {
      type: String,
      enum: ["active", "inactive", "suspended", "pending"],
      default: "pending",
    },
    expired_date: { type: Date, required: true },
  },
  { timestamps: true },
);

export const Customer = model<TCustomer>("Customer", customerSchema);
