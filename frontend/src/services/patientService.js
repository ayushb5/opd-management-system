import axiosInstance from "../api/axiosConfig";

// Add Patient
export const addPatient = async (patientData) => {
  const response = await axiosInstance.post("/patients", patientData);
  return response.data;
};

// Get all patients
export const getAllPatients = async () => {
  const response = await axiosInstance.get("/patients/all");
  return response.data;
};

// Get Patients by pagination and search functionality
export const getPatients = async (page = 0, size = 10, search = "") => {
  const response = await axiosInstance.get("/patients", {
    params: { page, size, search },
  });
  return response.data;
};

//Get Receptionist by Id
export const getPatientById = async (id) => {
  const response = await axiosInstance.get(`/patients/${id}`);
  return response.data;
};

// Update Patient by Id
export const updatePatient = async (id, patientData) => {
  const response = await axiosInstance.put(`/patients/${id}`, patientData);
  return response.data;
};

//Delete Patient by Id
export const deletePatient = async (id) => {
  const response = await axiosInstance.delete(`/patients/${id}`);
  return response.data;
};
