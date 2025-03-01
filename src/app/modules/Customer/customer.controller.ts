import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { CustomerServices } from "./customer.service";

const getAllCustomer = catchAsync(async (req, res) => {
  const result = await CustomerServices.GetAllCustomerFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Customer are retrieved successfully",
    data: result,
  });
});

export const customerControllers = { getAllCustomer };
