import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./admin.service";
import httpStatus from "http-status";

const getAllUser = catchAsync(async (req, res) => {
  const result = await UserServices.GetAllUserFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users are retrieved successfully",
    data: result,
  });
});
const updateUserRole = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedRole = req.body;
  const result = await UserServices.UpdateUserRoleIntoDb(id, updatedRole);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User role updated successfully",
    data: result,
  });
});

export const userControllers = {
  getAllUser,
  updateUserRole,
};
