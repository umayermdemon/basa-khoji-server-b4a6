import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { User } from "../User/user.model";
import { IRentalRequest } from "./tenants.interface";
import { RentalRequest } from "./tenants.model";
import { JwtPayload } from "jsonwebtoken";
import { RentalHouseListing } from "../Rental-House/rental-house.model";
import { IUser } from "../User/user.interface";
import mongoose from "mongoose";

const CreateRentalRequestIntoDb = async (
  payload: IRentalRequest,
  currentUser: JwtPayload,
) => {
  const email = currentUser?.email;
  const isExistUser = await User.isUserExistsByEmail(email);
  if (!isExistUser) {
    throw new AppError(httpStatus.NOT_FOUND, "Tenant not found.");
  }
  if (isExistUser?.role !== "tenant") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Only tenants can submit rental requests.",
    );
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const isExistsListing = await RentalHouseListing.findOne({
      _id: payload?.listingId,
    }).session(session);
    if (!isExistsListing) {
      throw new AppError(httpStatus.NOT_FOUND, "Rental House not found.");
    }

    if (!isExistsListing?.isAvailable) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        "Rental House is not available!",
      );
    }

    payload.tenantId = isExistUser?._id;
    const existingRequest = await RentalRequest.findOne({
      tenantId: payload.tenantId,
      listingId: payload.listingId,
    }).session(session);

    if (existingRequest) {
      throw new AppError(
        httpStatus.CONFLICT,
        "You have already submitted a request for this rental house.",
      );
    }
    const result = await RentalRequest.create([payload], { session });
    if (!result) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Failed to create rental request.",
      );
    }
    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, error);
  }
};

const GetRentalRequestFromDb = async (currentUser: JwtPayload) => {
  const isExistUser = await User.findOne({ email: currentUser?.email });

  if (!isExistUser) {
    throw new AppError(httpStatus.NOT_FOUND, "Tenant not found.");
  }

  const result = await RentalRequest.find({ tenantId: isExistUser._id });
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
