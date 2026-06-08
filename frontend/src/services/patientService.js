import axiosInstance from "../api/axiosConfig";

// Add Patient
export const addPatient = async (patientData) => {
  const response = await axiosInstance.post("/patient", patientData);
  return response.data;
};

// Get all Patients
export const getPatients = async () => {
  const response = await axiosInstance.get("/patient");
  return response.data;
};

//Get Receptionist by Id
export const getPatientById = async (id) => {
  const response = await axiosInstance.get(`/patient/${id}`);
  return response.data;
};

//Get Patients by Doctor Id
// export const getByDoctorId = async (id) => {
//   const response = await axiosInstance.get(`/patient/${id}`);
//   return response.data;
// };

// Update Patient by Id
export const updatePatient = async (id, patientData) => {
  const response = await axiosInstance.put(`/patient/${id}`, patientData);
  return response.data;
};

//Delete Patient by Id
export const deletePatient = async (id) => {
  const response = await axiosInstance.delete(`/patient/${id}`);
  return response.data;
};
