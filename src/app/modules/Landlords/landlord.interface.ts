import { Types } from "mongoose";

export interface IRentalHouse {
  title: string;
  location: {
    city: string;
    state: string;
    country: string;
    zipCode?: string;
    address?: string;
  };
  description: string;
  rentAmount: number;
  bedrooms: number;
  bathrooms: number;
  images: string[];
  landlordId: Types.ObjectId;
  availableFrom: Date;
  amenities?: string[];
  isAvailable: boolean;
}
