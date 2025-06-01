import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { LandlordServices as TenantsServices } from "./tenants.service";

const createRentalRequest = catchAsync(async (req, res) => {
  const result = await TenantsServices.CreateRentalRequestIntoDb(
    req.body,
    req?.user,
  );
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Rental requests has been submitted successfully",
    data: result,
  });
});
const getAllRentalRequest = catchAsync(async (req, res) => {
  console.log(req.user);
  const result = await TenantsServices.GetRentalRequestFromDb(req.user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rental requests are retrieved successfully",
    data: result,
  });
});

const updateTenantsProfile = catchAsync(async (req, res) => {
  const updatedData = req.body;
  const result = await TenantsServices.UpdateTenantsProfileIntoDb(
    req.user,
    updatedData,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Your profile updated successfully",
    data: result,
  });
});

export const TenantsControllers = {
  createRentalRequest,
  getAllRentalRequest,
  updateTenantsProfile,
};
