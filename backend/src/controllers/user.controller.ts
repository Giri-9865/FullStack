import { Request, Response } from "express";
import { validationResult } from "express-validator";

import {
  createUser,
  loginUser,
  updateUser,
  getUserData,
} from "../services/user.service";

export const createUserController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    await createUser(req.body);
    res.status(201).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user" });
  }
};

export const loginUserController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const result = await loginUser(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in" });
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const result = await updateUser(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user" });
  }
};

export const userDataController = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const userData = await getUserData(email);
    res.status(200).send(userData);
  } catch (error) {
    console.error(error);
    res.status(400).send("Error while fetching");
  }
};
