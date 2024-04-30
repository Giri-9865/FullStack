import instance from "./axiosInstance";

const orderData = async (data, totalPrice, selectedAddress) => {
  const userEmail = localStorage.getItem("userEmail");
  try {
    const response = await instance.post("/api/createOrder", {
      orderData: data,
      totalPrice: totalPrice,
      email: userEmail,
      address: selectedAddress,
    });
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const myOrder = async (userEmail) => {
  try {
    const response = await instance.post("/api/viewOrderData", {
      email: userEmail,
    });
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export { orderData, myOrder };
