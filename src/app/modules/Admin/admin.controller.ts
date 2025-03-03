import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AdminServices } from "./admin.service";
import httpStatus from "http-status";

const getAllUser = catchAsync(async (req, res) => {
  const result = await AdminServices.GetAllUserFromDb();
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
  const result = await AdminServices.UpdateUserRoleIntoDb(id, updatedRole);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User role updated successfully",
    data: result,
  });
});
const deleteUser = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await AdminServices.DeleteUserFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User deleted successfully",
    data: result,
  });
});
const getAllRentalHouse = catchAsync(async (req, res) => {
  const result = await AdminServices.GetAllRentalHouseFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All rental houses are retrieved successfully",
    data: result,
  });
});

const updateRentalHouse = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await AdminServices.UpdateRentalHouseIntoDb(id, updatedData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rental House updated successfully",
    data: result,
  });
});

export const AdminControllers = {
  getAllUser,
  updateUserRole,
  deleteUser,
  getAllRentalHouse,
  updateRentalHouse,
};
