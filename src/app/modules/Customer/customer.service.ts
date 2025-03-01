import { Customer } from "./customer.model";

const GetAllCustomerFromDb = async () => {
  const customer = await Customer.find();
  return customer;
};

export const CustomerServices = { GetAllCustomerFromDb };
