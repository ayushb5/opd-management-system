import axiosInstance from "../api/axiosConfig";

// Add Visit
export const addVisit = async (visitData) => {
  const response = await axiosInstance.post("/visits", visitData);
  return response.data;
};

// Get all Visits
export const getVisits = async () => {
  const response = await axiosInstance.get("/visits");
  return response.data;
};

//Get Visit by Id
export const getVisit = async (id) => {
  const response = await axiosInstance.get(`/visits/${id}`);
  return response.data;
};

//Get Visits by Doctor Id
// export const getByDoctorId = async (id) => {
//   const response = await axiosInstance.get(`/visits/doctor/${id}`);
//   return response.data;
// };

//Get Visits by Patient Id
// export const getByPatientId = async (id) => {
//   const response = await axiosInstance.get(`/visits/patient/${id}`);
//   return response.data;
// };

// Update Visit by Id
export const updateVisit = async (id, visitData) => {
  const response = await axiosInstance.put(`/visits/${id}`, visitData);
  return response.data;
};

//Delete Visit by Id
export const deleteVisit = async (id) => {
  const response = await axiosInstance.delete(`/visits/${id}`);
  return response.data;
};
