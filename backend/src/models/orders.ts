import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  orderData: {
    type: Array,
    required: true,
  },
});

const Orders = mongoose.model("orders", orderSchema);
export default Orders;
