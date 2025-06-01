import AppError from "../../errors/AppError";
import { IRentalHouse } from "../Rental-House/rental-house.interface";
import { RentalHouseListing } from "../Rental-House/rental-house.model";
import { IUser } from "../User/user.interface";
import { User } from "../User/user.model";
import httpStatus from "http-status";

const GetAllUserFromDb = async () => {
  const result = await User.find({ role: { $in: ["landlord", "tenant"] } });
  return result;
};
const UpdateUserRoleIntoDb = async (
  id: string,
  updatedRole: Partial<IUser>,
) => {
  const allowedFields = ["role"];
  const updateKeys = Object.keys(updatedRole);

  if (updateKeys.some(key => !allowedFields.includes(key))) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Only the 'role' field can be updated.",
    );
  }
  const isExistUser = await User.findById(id);
  if (!isExistUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  if (isExistUser?.role === "admin") {
    throw new AppError(httpStatus.BAD_REQUEST, "Admin role cannot be updated.");
  }
  if (isExistUser?.status === "suspended") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Suspended accounts role cannot be updated. ",
    );
  }
  const result = await User.updateOne({ _id: id }, updatedRole, {
    runValidators: true,
  });
  if (result?.modifiedCount === 0) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "User not found or no changes made",
    );
  }
  return await User.findById(id);
};
const UpdateUserStatusIntoDb = async (
  id: string,
  updatedStatus: Partial<IUser>,
) => {
  const allowedFields = ["status"];
  const updateKeys = Object.keys(updatedStatus);

  if (updateKeys.some(key => !allowedFields.includes(key))) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Only the 'status' field can be updated.",
    );
  }
  const isExistUser = await User.findById(id);
  if (!isExistUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  if (isExistUser?.role === "admin") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Admin status cannot be updated.",
    );
  }
  if (isExistUser?.status === "suspended") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Suspended accounts status cannot be updated. ",
    );
  }
  const result = await User.updateOne({ _id: id }, updatedStatus, {
    runValidators: true,
  });
  if (result?.modifiedCount === 0) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "User not found or no changes made",
    );
  }
  return await User.findById(id);
};
const DeleteUserFromDb = async (id: string) => {
  const isExistUser = await User.findById(id);
  if (!isExistUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  if (isExistUser?.role === "admin") {
    throw new AppError(httpStatus.BAD_REQUEST, "Admin cannot be deleted.");
  }
  if (isExistUser?.status !== "suspended") {
    const formattedStatus =
      isExistUser?.status.charAt(0).toUpperCase() +
      isExistUser?.status.slice(1);
    throw new AppError(
      httpStatus.BAD_REQUEST,
      ` Only suspended accounts can be deleted. ${formattedStatus} accounts cannot be removed.`,
    );
  }
  const result = await User.deleteOne({ _id: isExistUser?._id });
  if (result?.deletedCount === 0) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "User not found or no changes made",
    );
  }
  return null;
};
const GetAllRentalHouseFromDb = async () => {
  const result = await RentalHouseListing.find();
  return result;
};
const UpdateRentalHouseIntoDb = async (
  id: string,
  updatedData: Partial<IRentalHouse>,
) => {
  const allowedFields = ["isAvailable"];
  const updateKeys = Object.keys(updatedData);

  if (updateKeys.some(key => !allowedFields.includes(key))) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Only the 'isAvailable' field can be updated.",
    );
  }
  const result = await RentalHouseListing.updateOne({ _id: id }, updatedData, {
    runValidators: true,
  });
  if (result?.modifiedCount === 0) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Rental House not found or no changes made",
    );
  }
  return await RentalHouseListing.findById(id);
};
export const AdminServices = {
  GetAllUserFromDb,
  UpdateUserRoleIntoDb,
  DeleteUserFromDb,
  GetAllRentalHouseFromDb,
  UpdateRentalHouseIntoDb,
  UpdateUserStatusIntoDb,
};
