import { model, Schema } from "mongoose";
import { IListing } from "./landlord.interface";

const listingSchema = new Schema<IListing>(
  {
    title: { type: String, required: true, unique: true },
    location: {
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      zipCode: { type: String },
      address: { type: String },
    },
    description: { type: String, required: true },
    rentAmount: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    images: { type: [String], required: true },
    landlordId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    availableFrom: { type: Date, required: true },
    amenities: { type: [String], default: [] },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Listing = model<IListing>("Listing", listingSchema);
