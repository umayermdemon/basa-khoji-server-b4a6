import { Types } from "mongoose";

export interface IRentalRequest {
  listingId: Types.ObjectId;
  tenantId: Types.ObjectId;
  status: "pending" | "approved" | "rejected";
  landlordPhone?: string;
  paymentStatus?: "pending" | "paid" | "failed";
  additionalMessage?: string;
  moveInDate: Date;
  rentalDuration: number;
}
