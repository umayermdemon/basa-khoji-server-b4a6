import { Schema, model } from "mongoose";
import { IRentalRequest } from "./tenants.interface";

const rentalRequestSchema = new Schema<IRentalRequest>(
  {
    listingId: { type: Schema.Types.ObjectId, ref: "Listing", required: true },
    tenantId: { type: Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    landlordPhone: { type: String },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    additionalMessage: { type: String },
  },
  { timestamps: true },
);

export const Request = model<IRentalRequest>("Request", rentalRequestSchema);
