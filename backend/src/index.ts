import express from "express";
import cors from "cors";
import "dotenv/config";

import userRoutes from "./routes/UserRoute";
import displayData from "./routes/DataRoute";
import orderData from "./routes/OrderData";
import addressData from "./routes/AddressRoute";
import DbConnect from "./config/dbConfig";

const PORT = process.env.PORT;

DbConnect();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", userRoutes);
app.use("/api", displayData);
app.use("/api", orderData);
app.use("/api", addressData);

app.listen(PORT, () => {
  console.log(`Server started running in port ${PORT}`);
});
