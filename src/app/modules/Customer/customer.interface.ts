import { Types } from "mongoose";

export type TCustomer = {
  companyName: string;
  businessType: string;
  user: Types.ObjectId;
  owner: {
    name: string;
    email: string;
    phone: string;
    image: string;
  };
  address: {
    street: string;
    city: string;
    zipCode: string;
  };
  socialMedia: {
    facebook: string;
    linkedin: string;
    twitter: string;
  };
  registrationNumber: string;
  userID: string;
  status: "active" | "inactive" | "suspended" | "pending";
  expired_date: Date;
};
