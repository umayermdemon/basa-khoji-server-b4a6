import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { RentalHouseListing } from "./rental-house.model";
import { IRentalHouse } from "./rental-house.interface";
import { User } from "../User/user.model";
import { IImageFiles } from "../../interface/IImageFile";
import { JwtPayload } from "jsonwebtoken";
import { RentalRequest } from "../Requests/tenants.model";
import { IRentalRequest } from "../Requests/tenants.interface";
import { get } from "mongoose";

const createRentalHouseIntoDb = async (
  payload: IRentalHouse,
  houseImages: IImageFiles,
  currentUser: JwtPayload,
) => {
  const { images } = houseImages;
  if (!images || images.length === 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Rental House images are required.",
    );
  }

  payload.images = images.map(image => image.path);

  const email = currentUser?.email;

  const isExistUser = await User.findOne({ email });
  if (!isExistUser) {
    throw new AppError(httpStatus.NOT_FOUND, "Landlord not found!");
  }

  if (isExistUser?.role !== "landlord") {
    throw new AppError(httpStatus.BAD_REQUEST, "Tenant can't create listing");
  }
  payload.landlordId = isExistUser?._id;

  const result = await RentalHouseListing.create(payload);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, "Rental house created failed");
  }
  return result;
};
const getAllRentalHouseFromDbByCreator = async (currentUser: JwtPayload) => {
  const email = currentUser?.email;
  const isExistUser = await User.findOne({ email });

  if (!isExistUser) {
    throw new AppError(httpStatus.NOT_FOUND, "Landlord not found!");
  }
  const result = await RentalHouseListing.find({
    landlordId: isExistUser?._id,
  });
  return result;
};
const getAllRentalHouseFromDb = async () => {
  const result = await RentalHouseListing.find();
  return result;
};
const getSingleRentalHouseFromDb = async (id: string) => {
  const result = await RentalHouseListing.findById(id);
  return result;
};

const updateRentalHouseIntoDb = async (
  id: string,
  payload: Partial<IRentalHouse>,
) => {
  const result = await RentalHouseListing.updateOne({ _id: id }, payload, {
    runValidators: true,
  });
  if (result?.modifiedCount === 0) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Rental House not found or no changes were made",
    );
  }
  return await RentalHouseListing.findById(id);
};
const deleteRentalHouseFromDb = async (id: string) => {
  const result = await RentalHouseListing.deleteOne({ _id: id });
  if (result?.deletedCount === 0) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Rental House not found or no changes were made",
    );
  }
  return null;
};
const getAllRentalRequestForLandlordFromDb = async (
  currentUser: JwtPayload,
) => {
  const isExistUser = await User.findOne({ email: currentUser?.email });

  if (!isExistUser) {
    throw new AppError(httpStatus.NOT_FOUND, "Landlord not found.");
  }
  const isExistRentalHouses = await RentalHouseListing.find({
    landlordId: isExistUser?._id,
  });

  const listingId = await Promise.all(
    isExistRentalHouses.map(async rentalHouse => {
      const result = await RentalRequest.find({
        listingId: rentalHouse?._id,
      });
      return result;
    }),
  );
  return listingId[0];
};
const acceptOrRejectRentalRequest = async (
  id: string,
  updatedData: Partial<IRentalRequest>,
  currentUser: JwtPayload,
) => {
  const isExistUser = await User.findOne({ email: currentUser?.email });

  if (!isExistUser) {
    throw new AppError(httpStatus.NOT_FOUND, "Landlord not found.");
  }
  const allowedFields = ["status", "landlordPhone"];
  const updateKeys = Object.keys(updatedData);

  if (updateKeys.some(key => !allowedFields.includes(key))) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Only the 'status' & 'landlordPhone' field can be updated.",
    );
  }
  const isExistRentalRequest = await RentalRequest.findById(id);
  if (!isExistRentalRequest) {
    throw new AppError(httpStatus.NOT_FOUND, "Rental request not found!");
  }
  if (
    isExistRentalRequest?.status === "approved" &&
    updatedData.status === "pending"
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Approved status cannot be pending",
    );
  }
  if (
    isExistRentalRequest?.paymentStatus === "paid" &&
    updatedData.status === "rejected"
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Payment status cannot be rejected",
    );
  }
  const isExistRentalHouse = await RentalHouseListing.findById({
    _id: isExistRentalRequest?.listingId,
  });
  if (!isExistRentalHouse) {
    throw new AppError(httpStatus.NOT_FOUND, "Rental house not found!");
  }
  const isMatched = isExistRentalHouse?.landlordId !== isExistUser?._id;
  if (!isMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, "User not matched");
  }

  if (updatedData.status === "approved") {
    updatedData.landlordPhone = updatedData.landlordPhone;
  }

  const result = await RentalRequest.updateOne({ _id: id }, updatedData, {
    runValidators: true,
  });
  if (result?.modifiedCount === 0) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Rental request not found or no changes made",
    );
  }
  return await RentalRequest.findById(id);
};

export const RentalHouseServices = {
  createRentalHouseIntoDb,
  getAllRentalHouseFromDbByCreator,
  updateRentalHouseIntoDb,
  deleteRentalHouseFromDb,
  getAllRentalRequestForLandlordFromDb,
  acceptOrRejectRentalRequest,
  getSingleRentalHouseFromDb,
  getAllRentalHouseFromDb,
};
