import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { RentalHouseServices } from "./rental-house.service";
import { IImageFiles } from "../../interface/IImageFile";

const createRentalHouse = catchAsync(async (req, res) => {
  const result = await RentalHouseServices.createRentalHouseIntoDb(
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
const getAllRentalHouseFromDbByCreator = catchAsync(async (req, res) => {
  const result = await RentalHouseServices.getAllRentalHouseFromDbByCreator(
    req?.user,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rental houses are retrieved successfully",
    data: result,
  });
});

const getAllRentalHouse = catchAsync(async (req, res) => {
  const result = await RentalHouseServices.getAllRentalHouseFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rental houses are retrieved successfully",
    data: result,
  });
});

const getSingleRentalHouse = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await RentalHouseServices.getSingleRentalHouseFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rental house is retrieved successfully",
    data: result,
  });
});

const updateRentalHouse = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await RentalHouseServices.updateRentalHouseIntoDb(
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
const deleteRentalHouse = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await RentalHouseServices.deleteRentalHouseFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rental house deleted successfully",
    data: result,
  });
});
const getAllRentalRequestForLandlord = catchAsync(async (req, res) => {
  const result = await RentalHouseServices.getAllRentalRequestForLandlordFromDb(
    req?.user,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rental requests are retrieved successfully",
    data: result,
  });
});
const acceptOrRejectRentalRequest = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await RentalHouseServices.acceptOrRejectRentalRequest(
    id,
    updatedData,
    req?.user,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Rental Request ${updatedData?.status} `,
    data: result,
  });
});

export const RentalHouseControllers = {
  createRentalHouse,
  getAllRentalHouseFromDbByCreator,
  updateRentalHouse,
  deleteRentalHouse,
  getAllRentalRequestForLandlord,
  acceptOrRejectRentalRequest,
  getSingleRentalHouse,
  getAllRentalHouse,
};
