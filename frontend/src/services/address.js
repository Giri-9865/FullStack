import instance from "./axiosInstance";

const addAddress = async (address) => {
  const userEmail = localStorage.getItem("userEmail");
  try {
    const response = await instance.post("/api/createAddress", {
      email: userEmail,
      address: address,
    });
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const myAddresses = async (userEmail) => {
  try {
    const response = await instance.post("/api/myAddresses", {
      email: userEmail,
    });
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

const updateAddress = async (addressData) => {
  const userEmail = localStorage.getItem("userEmail");
  try {
    const response = await instance.put("/api/updateAddress", {
      email: userEmail,
      id: addressData.id,
      addressData: addressData,
    });
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const deleteAddress = async (id) => {
  const userEmail = localStorage.getItem("userEmail");
  try {
    const response = await instance.put("/api/deleteAddress", {
      email: userEmail,
      id: id,
    });
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export { addAddress, myAddresses, updateAddress, deleteAddress };
