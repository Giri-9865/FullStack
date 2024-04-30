import { Request, Response } from "express";
import { createOrder, getOrderData } from "../services/order.service";

export const createOrderController = async (req: Request, res: Response) => {
  const { orderData, address, email, totalPrice } = req.body;

  try {
    await createOrder(email, orderData, address, totalPrice);
    res.status(201).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const orderDataController = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const myData = await getOrderData(email);
    res.status(200).json({ orderData: myData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
