import { Request, Response } from "express";
import {
  createAddress,
  getAddressData,
  updateAddress,
  deleteAddress,
} from "../services/address.service";

export const createAddressController = async (req: Request, res: Response) => {
  const { email, address } = req.body;

  try {
    await createAddress(email, address);
    res.status(201).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const addressDataController = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const myData = await getAddressData(email);
    res.status(200).json(myData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateAddressController = async (req: Request, res: Response) => {
  const { email, id, addressData } = req.body;

  try {
    await updateAddress(email, id, addressData);
    res
      .status(200)
      .json({ success: true, message: "Address updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating address" });
  }
};

export const deleteAddressController = async (req: Request, res: Response) => {
  const { email, id } = req.body;

  try {
    await deleteAddress(email, id);
    res
      .status(200)
      .json({ success: true, message: "Address deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting address" });
  }
};
