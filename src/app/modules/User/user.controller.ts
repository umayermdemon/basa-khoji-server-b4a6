import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";
import httpStatus from "http-status";

const createCustomer = catchAsync(async (req, res) => {
  const { password, customer } = req.body;
  const result = await UserServices.CreateCustomerIntoDb(password, customer);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Customer created successfully",
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

export const userControllers = { createCustomer, getAllUser, getSingleUser };
