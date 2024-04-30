import mongoose from "mongoose";
import "dotenv/config";

const DbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
    console.log("Connected to database");
  } catch (error) {
    console.log("Not Connected");
    console.log(error);
  }
};

export default DbConnect;
