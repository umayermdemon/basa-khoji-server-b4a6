import { v2 as cloudinary } from "cloudinary";
import config from "../config";
import multer from "multer";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import fs from "fs";
import path from "path";

// Function to delete local file
const deleteLocalFile = (path: string) => {
  fs.unlink(path, err => {
    if (err) {
      console.error(`Error removing file: ${err}`);
    } else {
      console.log(`File ${path} has been successfully removed.`);
    }
  });
};

const deleteAllFilesInUploadFolder = () => {
  const uploadDir = path.join(process.cwd(), "uploads");

  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      console.error("Error reading uploads folder:", err);
      return;
    }

    for (const file of files) {
      const filePath = path.join(uploadDir, file);
      deleteLocalFile(filePath);
    }
  });
};

export const sendImageToCloudinary = async (
  imageName: string,
  path: string,
) => {
  // Cloudinary Configuration
  cloudinary.config({
    cloud_name: config.cloudinary_cloud_name,
    api_key: config.cloudinary_api_key,
    api_secret: config.cloudinary_api_secret,
  });

  try {
    // Upload the image
    const uploadResult = await cloudinary.uploader.upload(path, {
      public_id: imageName,
    });

    // Delete file after successful upload
    deleteLocalFile(path);
    deleteAllFilesInUploadFolder();

    return uploadResult;
  } catch (error) {
    // Delete file if upload fails
    deleteLocalFile(path);
    deleteAllFilesInUploadFolder();

    throw new AppError(httpStatus.CONFLICT, "Image upload failed");
  }
};

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
