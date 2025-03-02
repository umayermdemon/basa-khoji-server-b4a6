import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { LandlordServices } from "./landlord.service";
import { IImageFiles } from "../../interface/IImageFile";

const createRentalHouse = catchAsync(async (req, res) => {
  const result = await LandlordServices.CreateRentalHouseIntoDb(
    req.body,
    req.files as IImageFiles,
    req?.user,
  );
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Rental house has been created successfully",
    data: result,
  });
});
const getAllRentalHouse = catchAsync(async (req, res) => {
  const result = await LandlordServices.GetAllRentalHouseFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rental houses are retrieved successfully",
    data: result,
  });
});

const updateRentalHouse = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await LandlordServices.UpdateRentalHouseIntoDb(
    id,
    updatedData,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rental house updated successfully",
    data: result,
  });
});
const deleteUser = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await LandlordServices.DeleteRentalHouseFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rental house deleted successfully",
    data: result,
  });
});
const getAllRentalHouseByLandlord = catchAsync(async (req, res) => {
  const result = await LandlordServices.GetAllRentalHouseByLandlordFromDb(
    req?.user,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rental houses are retrieved successfully",
    data: result,
  });
});

export const LandlordControllers = {
  createRentalHouse,
  getAllRentalHouse,
  updateRentalHouse,
  deleteUser,
  getAllRentalHouseByLandlord,
};
