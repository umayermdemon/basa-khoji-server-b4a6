import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";
import httpStatus from "http-status";

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.CreateUserIntoDb(req.body);
  const role = req?.body?.role;
  const formattedRole = role.charAt(0).toUpperCase() + role.slice(1);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: `${formattedRole} has been created successfully`,
    data: result,
  });
});
const getAllUser = catchAsync(async (req, res) => {
  const result = await UserServices.GetAllUserFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User are retrieved successfully",
    data: result,
  });
});
const getSingleUser = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const result = await UserServices.GetSingleUserFromDb(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is retrieved successfully",
    data: result,
  });
});

export const userControllers = {
  createUser,
  getAllUser,
  getSingleUser,
};
