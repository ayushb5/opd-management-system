import axiosInstance from "../api/axiosConfig";

// Add Prescription
export const addPrescription = async (prescriptionData) => {
  const response = await axiosInstance.post("/prescriptions", prescriptionData);
  return response.data;
};

// Get all Prescriptions
export const getPrescriptions = async () => {
  const response = await axiosInstance.get("/prescriptions");
  return response.data;
};

//Get Prescription by Id
export const getPrescription = async (id) => {
  const response = await axiosInstance.get(`/prescriptions/${id}`);
  return response.data;
};

// Get Prescription by Visit Id
export const getByVisitId = async (id) => {
  const response = await axiosInstance.get(`/prescriptions/visit/${id}`);
  return response.data;
};

// Update Prescription by Id
export const updatePrescription = async (id, prescriptionData) => {
  const response = await axiosInstance.put(
    `/prescriptions/${id}`,
    prescriptionData,
  );
  return response.data;
};

//Delete Prescription by Id
export const deletePrescription = async (id) => {
  const response = await axiosInstance.delete(`/prescriptions/${id}`);
  return response.data;
};
