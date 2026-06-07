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

//Get doctor by Id
export const getDoctorById = async (id) => {
  const response = await axiosInstance.get(`/doctor/${id}`);
  return response.data;
};

// Update doctor by Id
export const updateDoctor = async (id, doctorData) => {
  const response = await axiosInstance.put(`/doctor/${id}`, doctorData);
  return response.data;
};

//Delete doctor by Id
export const deleteDoctor = async (id) => {
  const response = await axiosInstance.delete(`/doctor/${id}`);
  return response.data;
};
