import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.service";
import httpStatus from "http-status";

const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUser(req.body);
  const { accessToken, role } = result;
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Logged in ${role} successfully.`,
    data: { accessToken },
  });
});

export const authControllers = { loginUser };
