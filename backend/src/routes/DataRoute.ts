import express from "express";
import { foodDataController } from "../controllers/foodData.controller";
const router = express.Router();

router.get("/foodData", foodDataController);

export default router;
