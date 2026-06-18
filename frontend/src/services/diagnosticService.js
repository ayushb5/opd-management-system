import axiosInstance from "../api/axiosConfig";

// Add Diagnostic
export const addDiagnostic = async (diagnosticData) => {
  const response = await axiosInstance.post("/diagnostics", diagnosticData);
  return response.data;
};

// Get all Diagnostics
export const getDiagnostics = async () => {
  const response = await axiosInstance.get("/diagnostics");
  return response.data;
};

//Get Diagnostic by Id
export const getDiagnostic = async (id) => {
  const response = await axiosInstance.get(`/diagnostics/${id}`);
  return response.data;
};

// Get Diagnostic by Visit Id
export const getByVisitId = async (id) => {
  const response = await axiosInstance.get(`/diagnostics/visit/${id}`);
  return response.data;
};

// Get Diagnostic by Doctor Id
export const getByDoctorId = async (id) => {
  const response = await axiosInstance.get(`/diagnostics/doctor/${id}`);
  return response.data;
};

// Update Diagnostic by Id
export const updateDiagnostic = async (id, diagnosticData) => {
  const response = await axiosInstance.put(
    `/diagnostics/${id}`,
    diagnosticData,
  );
  return response.data;
};

//Delete Diagnostic by Id
export const deleteDiagnostic = async (id) => {
  const response = await axiosInstance.delete(`/diagnostics/${id}`);
  return response.data;
};
