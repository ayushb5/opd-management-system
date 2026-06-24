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

// Get Visit by date
export const getVisitsByDate = async (date) => {
  const response = await axiosInstance.get(`/visits/date/${date}`);

  return response.data;
};

// Get Visit by Doctor and Date
export const getVisitsByDoctorAndDate = async (doctorId, date) => {
  const response = await axiosInstance.get(
    `/visits/doctor/${doctorId}/date/${date}`,
  );

  return response.data;
};

// Get all Follow-ups by Doctor Id
export const getFollowUpsByDoctor = async (doctorId) => {
  const response = await axiosInstance.get(
    `/visits/doctor/${doctorId}/follow-ups`,
  );
  return response.data;
};

// Get Today's Follow-ups by Doctor Id
export const getTodayFollowUpsByDoctor = async (doctorId) => {
  const response = await axiosInstance.get(
    `/visits/doctor/${doctorId}/follow-ups/today`,
  );
  return response.data;
};

// Get Overdue Follow-ups by Doctor Id
export const getOverdueFollowUpsByDoctor = async (doctorId) => {
  const response = await axiosInstance.get(
    `/visits/doctor/${doctorId}/follow-ups/overdue`,
  );
  return response.data;
};

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
