import express from "express";
import {
  addressDataController,
  deleteAddressController,
  createAddressController,
  updateAddressController,
} from "../controllers/address.controller";
const router = express.Router();

router.post("/createAddress", createAddressController);
router.post("/myAddresses", addressDataController);
router.put("/updateAddress", updateAddressController);
router.put("/deleteAddress", deleteAddressController);

export default router;
