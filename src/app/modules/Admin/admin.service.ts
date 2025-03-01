import { IUser } from "../User/user.interface";
import { User } from "../User/user.model";

const GetAllUserFromDb = async () => {
  const user = await User.find();
  return user;
};
const UpdateUserRoleIntoDb = async (
  id: string,
  updatedRole: Partial<IUser>,
) => {
  const allowedFields = ["role"];
  const updateKeys = Object.keys(updatedRole);

  if (updateKeys.some(key => !allowedFields.includes(key))) {
    throw new Error("Only the 'role' field can be updated.");
  }
  const result = await User.updateOne({ _id: id }, updatedRole, {
    runValidators: true,
    new: true,
  });
  if (result?.modifiedCount === 0) {
    throw new Error("Product not found or no changes made");
  }
  return await User.findById(id);
};
export const UserServices = {
  GetAllUserFromDb,
  UpdateUserRoleIntoDb,
};
