import axiosInstance from "../api/axiosConfig";

// Add Doctor
export const addDoctor = async (doctorData) => {
  const response = await axiosInstance.post("/doctors", doctorData);
  return response.data;
};

// Get all doctors
export const getAllDoctors = async () => {
  const response = await axiosInstance.get("/doctors/all");
  return response.data;
};

// Get Doctors by pagination and search functionality
export const getDoctors = async (page = 0, size = 10, search = "") => {
  const response = await axiosInstance.get("/doctors", {
    params: { page, size, search },
  });
  return response.data;
};

//Get doctor by Id
export const getDoctorById = async (id) => {
  const response = await axiosInstance.get(`/doctors/${id}`);
  return response.data;
};

// Update doctor by Id
export const updateDoctor = async (id, doctorData) => {
  const response = await axiosInstance.put(`/doctors/${id}`, doctorData);
  return response.data;
};

//Delete doctor by Id
export const deleteDoctor = async (id) => {
  const response = await axiosInstance.delete(`/doctors/${id}`);
  return response.data;
};
