import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { LandlordServices } from "./landlord.service";

const createListing = catchAsync(async (req, res) => {
  const result = await LandlordServices.CreateListingIntoDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Listing has been created successfully",
    data: result,
  });
});
const getAllListing = catchAsync(async (req, res) => {
  const result = await LandlordServices.GetAllListingFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Listings are retrieved successfully",
    data: result,
  });
});

const updateListings = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await LandlordServices.UpdateListingsIntoDb(id, updatedData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Listings updated successfully",
    data: result,
  });
});
// const deleteUser = catchAsync(async (req, res) => {
//   const id = req.params.id;
//   const result = await AdminServices.DeleteUserFromDb(id);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "User deleted successfully",
//     data: result,
//   });
// });

export const LandlordControllers = {
  createListing,
  getAllListing,
  updateListings,
};
