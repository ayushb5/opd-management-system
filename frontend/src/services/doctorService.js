import axiosInstance from "../api/axiosConfig";

// Add Doctor
export const addDoctor = async (doctorData) => {
  const response = await axiosInstance.post("/doctor", doctorData);
  return response.data;
};

// Get all Doctors
export const getDoctors = async () => {
  const response = await axiosInstance.get("/doctor");
  return response.data;
};
