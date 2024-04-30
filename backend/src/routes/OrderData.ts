import express from "express";
const router = express.Router();

import {
  orderDataController,
  createOrderController,
} from "../controllers/orderData.controller";

router.post("/createOrder", createOrderController);
router.post("/viewOrderData", orderDataController);

export default router;
