import instance from "./axiosInstance";

export const foodData = async () => {
  try {
    const response = await instance.get("/api/foodData");
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default foodData;
