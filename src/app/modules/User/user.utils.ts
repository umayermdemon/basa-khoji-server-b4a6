import { Customer } from "../Customer/customer.model";
import { User } from "./user.model";
import crypto from "crypto";

const findLastCustomerId = async () => {
  const lastCustomer = await User.findOne(
    {
      role: "customer",
    },
    {
      userId: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastCustomer?.userId ? lastCustomer.userId.substring(2) : undefined;
};

export const generatedCustomerId = async () => {
  let currentId = 0;
  const lastCustomerId = await findLastCustomerId();

  if (lastCustomerId) {
    const numericPart = lastCustomerId.match(/\d+/g);
    currentId = numericPart ? parseInt(numericPart[0], 4) : 0;
  }
  const incrementId = (currentId + 1).toString();
  const randomSuffix = crypto.randomBytes(4).toString("hex").toUpperCase();
  const newId = `CUST-${incrementId}${randomSuffix}`;
  return newId;
};
const findLastCustomerRegNo = async () => {
  const lastCustomer = await Customer.findOne(
    {},
    { registrationNumber: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastCustomer?.registrationNumber || undefined;
};

// Function to generate the next customer registration number
export const generatedCustomerRegNo = async () => {
  const lastCustomerRegNo = await findLastCustomerRegNo();
  let lastNumber = 0;

  if (lastCustomerRegNo) {
    const numericPart = lastCustomerRegNo.match(/\d+/g);
    lastNumber = numericPart ? parseInt(numericPart[0], 4) : 0;
  }

  const incrementRegNo = (lastNumber + 1).toString();

  const randomSuffix = crypto.randomBytes(3).toString("hex").toUpperCase();

  const newRegNumber = `REG-${incrementRegNo}${randomSuffix}`;

  return newRegNumber;
};

const findLastAdminId = async () => {
  const lastAdmin = await User.findOne(
    {
      role: "admin",
    },
    {
      userId: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdmin?.userId ? lastAdmin.userId.substring(2) : undefined;
};

export const generatedAdminId = async () => {
  let currentId = 0;
  const lastAdminId = await findLastAdminId();

  if (lastAdminId) {
    const numericPart = lastAdminId.match(/\d+/g);
    currentId = numericPart ? parseInt(numericPart[0], 4) : 0;
  }
  const incrementId = (currentId + 1).toString();
  const randomSuffix = crypto.randomBytes(4).toString("hex").toUpperCase();
  const newId = `A-${incrementId}${randomSuffix}`;
  return newId;
};
