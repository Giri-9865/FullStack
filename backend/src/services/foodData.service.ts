import mongoose from "mongoose";

export const getFoodData = async () => {
  const fetchedData = await mongoose.connection.db.collection("foodItems");
  const foodItems = await fetchedData.find({}).toArray();
  const catData = await mongoose.connection.db.collection("foodCategories");
  const foodCategories = await catData.find({}).toArray();
  return { foodItems, foodCategories };
};
