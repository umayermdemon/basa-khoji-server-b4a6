import AppError from "../../errors/AppError";
import { IRentalHouse } from "../Landlords/landlord.interface";
import { RentalHouseListing } from "../Landlords/landlord.model";
import { IUser } from "../User/user.interface";
import { User } from "../User/user.model";
import httpStatus from "http-status";

const GetAllUserFromDb = async () => {
  const result = await User.find();
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
const DeleteUserFromDb = async (id: string) => {
  const result = await User.deleteOne({ _id: id });
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
const UpdateListingIntoDb = async (
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
  UpdateListingIntoDb,
};
