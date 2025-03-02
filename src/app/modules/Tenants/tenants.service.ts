import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { User } from "../User/user.model";
import { IRentalRequest } from "./tenants.interface";
import { Request } from "./tenants.model";
import { JwtPayload } from "jsonwebtoken";
import { Listing } from "../Landlords/landlord.model";
import { IUser } from "../User/user.interface";

const CreateRentalRequestIntoDb = async (
  payload: IRentalRequest,
  currentUser: JwtPayload,
) => {
  const isExistUser = await User.findOne({ email: currentUser?.email });
  if (!isExistUser) {
    throw new AppError(httpStatus.NOT_FOUND, "Tenant not found.");
  }
  if (isExistUser?.role !== "tenant") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Only tenants can submit rental requests.",
    );
  }
  const isExistsListing = await Listing.findOne({ _id: payload?.listingId });
  if (!isExistsListing) {
    throw new AppError(httpStatus.NOT_FOUND, "Listing not found.");
  }

  payload.tenantId = isExistUser?._id;
  const existingRequest = await Request.findOne({
    tenantId: payload.tenantId,
    listingId: payload.listingId,
  });

  if (existingRequest) {
    throw new AppError(
      httpStatus.CONFLICT,
      "You have already submitted a request for this listing.",
    );
  }
  const result = await Request.create(payload);
  if (!result) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Failed to create rental request.",
    );
  }
  return result;
};

const GetRentalRequestFromDb = async (currentUser: JwtPayload) => {
  const isExistUser = await User.findOne({ email: currentUser?.email });

  if (!isExistUser) {
    throw new AppError(httpStatus.NOT_FOUND, "Tenant not found.");
  }

  const result = await Request.find({ tenantId: isExistUser._id });
  return result;
};

const UpdateTenantsProfileIntoDb = async (
  currentUser: JwtPayload,
  payload: Partial<IUser>,
) => {
  const isExistUser = await User.findOne({ email: currentUser?.email });

  if (!isExistUser) {
    throw new AppError(httpStatus.NOT_FOUND, "Tenant not found.");
  }
  const allowedFields = ["name", "userName", "phoneNumber"];
  const updateKeys = Object.keys(payload);

  if (updateKeys.some(key => !allowedFields.includes(key))) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Only 'name', 'userName', and 'phoneNumber' fields can be updated.",
    );
  }
  const userName = payload?.userName;
  const isExistUserName = await User.findOne({ userName });
  if (isExistUserName) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This user name is already used. Please try another.",
    );
  }
  const result = await User.updateOne({ _id: isExistUser?._id }, payload, {
    runValidators: true,
  });
  if (result?.modifiedCount === 0) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Tenants not found or no changes were made",
    );
  }

  return await User.findById(isExistUser?._id);
};

export const LandlordServices = {
  CreateRentalRequestIntoDb,
  GetRentalRequestFromDb,
  UpdateTenantsProfileIntoDb,
};
