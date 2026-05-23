import axiosInstance from "../api/axiosInstance";

export const getAllPatients = async () => {
  try {
    const response = await axiosInstance.get("/patient");
    return response.data;
  } catch (error) {
    console.log("Error fetching patients:", error);
    throw error;
  }
};

export const addPatient = async (patientData) => {
  try {
    const response = await axiosInstance.post("/patient", patientData);
    return response.data;
  } catch (error) {
    console.log("Error adding patient:", error);
    throw error;
  }
};

export const getPatientById = async (id) => {
  try {
    const response = await axiosInstance.get(`/patient/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error fetching patient:", error);
    throw error;
  }
};

export const updatePatient = async (id, patientData) => {
  try {
    const response = await axiosInstance.put(`/patient/${id}`, patientData);
    return response.data;
  } catch (error) {
    console.log("Error updating patient:", error);
    throw error;
  }
};

export const deletePatient = async (id) => {
  try {
    const response = await axiosInstance.delete(`/patient/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error deleting patient:", error);
    throw error;
  }
};
