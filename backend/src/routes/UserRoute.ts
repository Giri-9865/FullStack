import express from "express";
import { body } from "express-validator";

import {
  createUserController,
  loginUserController,
  updateUserController,
  userDataController,
} from "../controllers/user.controller";

const router = express.Router();

router.post(
  "/signin",
  body("email", "Invalid email").isEmail(),
  body("password", "Incorrect password").isLength({ min: 8 }),
  createUserController
);

router.post(
  "/login",
  body("email", "Invalid email").isEmail(),
  body("password", "Incorrect password").isLength({ min: 8 }),
  loginUserController
);

router.post("/userData", userDataController);

router.put("/update", updateUserController);

export default router;
