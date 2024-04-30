import { Request, Response } from "express";
import { getFoodData } from "../services/foodData.service";

export const foodDataController = async (req: Request, res: Response) => {
  try {
    const { foodItems, foodCategories } = await getFoodData();
    res.status(200).send({ foodItems, foodCategories });
  } catch (error) {
    console.error(error);
    res.status(400).send("Server error");
  }
};
