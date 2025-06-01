import { Schema, model } from "mongoose";
import { IRentalRequest } from "./tenants.interface";

const rentalRequestSchema = new Schema<IRentalRequest>(
  {
    listingId: {
      type: Schema.Types.ObjectId,
      ref: "RentalHouseListing",
      required: true,
    },
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
    moveInDate: { type: Date },
    rentalDuration: { type: Number },
  },
  { timestamps: true },
);

export const RentalRequest = model<IRentalRequest>(
  "RentalRequest",
  rentalRequestSchema,
);
