import instance from "./axiosInstance";

const authenticated = () => {
  if (localStorage.getItem("authToken")) {
    return true;
  }
  return false;
};

const signIn = async (credentials) => {
  try {
    const response = await instance.post("/api/signin", credentials);
    return response;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

const logIn = async (credentials) => {
  let result = {};
  try {
    const response = await instance.post("/api/login", credentials);
    result = { data: response.data, authToken: response.data.authToken };
    return result;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

const userProfileData = async () => {
  const userEmail = localStorage.getItem("userEmail");
  try {
    const response = await instance.post("/api/userData", { email: userEmail });
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const updateProfile = async (data) => {
  const userEmail = localStorage.getItem("userEmail");
  try {
    const response = await instance.put("/api/update", {
      email: userEmail,
      name: data.name,
      password: data.password,
      mobile: data.mobile,
    });
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export { signIn, logIn, updateProfile, authenticated, userProfileData };
