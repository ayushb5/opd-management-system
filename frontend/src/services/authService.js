import axiosInstance from "../api/axiosConfig";

// Login
export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};

// forgot password
export const forgotPassword = async (data) => {
  const response = await axiosInstance.post("/auth/forgot-password", data);
  return response.data;
};

export const validateResetToken = async (token) => {
  const response = await axiosInstance.get("/auth/validate-reset-token", {
    params: { token },
  });
  return response.data;
};

export const resetPassword = async (data) => {
  const response = await axiosInstance.post("/auth/reset-password", data);
  return response.data;
};

// Verify otp
export const verifyOtp = async (data) => {
  const response = await axiosInstance.post("/auth/verify-otp", data);
  return response.data;
};
