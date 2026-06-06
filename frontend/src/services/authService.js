import axiosInstance from "../api/axiosConfig";

// Login
export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};
