import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { RentalHouseListing } from "./landlord.model";
import { IRentalHouse } from "./landlord.interface";
import { User } from "../User/user.model";
import { IImageFiles } from "../../interface/IImageFile";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { JwtPayload } from "jsonwebtoken";
import { RentalRequest } from "../Tenants/tenants.model";

const CreateRentalHouseIntoDb = async (
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

  const uploadedImages = await Promise.all(
    images.map(async image => {
      const uploadResult = await sendImageToCloudinary(
        image.originalname,
        image.path,
      );
      return uploadResult;
    }),
  );
  const secure_url = uploadedImages.map((img: any) => img.secure_url);
  payload.images = secure_url;

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
const GetAllRentalHouseFromDb = async () => {
  const result = await RentalHouseListing.find();
  return result;
};

const UpdateRentalHouseIntoDb = async (
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
const DeleteRentalHouseFromDb = async (id: string) => {
  const result = await RentalHouseListing.deleteOne({ _id: id });
  if (result?.deletedCount === 0) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Rental House not found or no changes were made",
    );
  }
  return null;
};
const GetAllRentalHouseByLandlordFromDb = async (currentUser: JwtPayload) => {
  const isExistUser = await User.findOne({ email: currentUser?.email });

  if (!isExistUser) {
    throw new AppError(httpStatus.NOT_FOUND, "Landlord not found.");
  }
  const isExistRentalHouses = await RentalHouseListing.find({
    landlordId: isExistUser?._id,
  });
  const listingId = await Promise.all(
    isExistRentalHouses.map(async rentalHouse => {
      console.log(rentalHouse?._id);
      const result = await RentalRequest.find({
        listingId: rentalHouse?._id,
      });
      return result;
    }),
  );
  return listingId;
};

export const LandlordServices = {
  CreateRentalHouseIntoDb,
  GetAllRentalHouseFromDb,
  UpdateRentalHouseIntoDb,
  DeleteRentalHouseFromDb,
  GetAllRentalHouseByLandlordFromDb,
};
