import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  addressData: {
    type: Array,
    required: true,
  },
});

const Address = mongoose.model("address", addressSchema);
export default Address;
