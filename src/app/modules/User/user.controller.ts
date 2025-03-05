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
// get me
const getMe = catchAsync(async (req, res) => {
  const { email } = req.user;
  const result = await UserServices.getMe(email);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is retrieved successfully",
    data: result,
  });
});

export const UserControllers = {
  createUser,
  getMe,
};
