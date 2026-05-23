import axiosInstance from "../api/axiosInstance";

export const getAllDoctors = async () => {
  try {
    const response = await axiosInstance.get("/doctor");
    return response.data;
  } catch (error) {
    console.log("Error fetching doctors:", error);
    throw error;
  }
};

export const addDoctor = async (doctorData) => {
  try {
    const response = await axiosInstance.post("/doctor", doctorData);
    return response.data;
  } catch (error) {
    console.log("Error adding doctor:", error);
    throw error;
  }
};

export const getDoctorById = async (id) => {
  try {
    const response = await axiosInstance.get(`/doctor/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error fetching doctor:", error);
    throw error;
  }
};

export const updateDoctor = async (id, doctorData) => {
  try {
    const response = await axiosInstance.put(`/doctor/${id}`, doctorData);
    return response.data;
  } catch (error) {
    console.log("Error updating doctor:", error);
    throw error;
  }
};

export const deleteDoctor = async (id) => {
  try {
    const response = await axiosInstance.delete(`/doctor/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error deleting doctor:", error);
    throw error;
  }
};
