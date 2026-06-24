import axiosInstance from "../api/axiosConfig";

// Add Referral
export const addReferral = async (referralData) => {
  const response = await axiosInstance.post("/referrals", referralData);
  return response.data;
};

// Get all Referrals
export const getReferrals = async () => {
  const response = await axiosInstance.get("/referrals");
  return response.data;
};

//Get Referral by Id
export const getReferral = async (id) => {
  const response = await axiosInstance.get(`/referrals/${id}`);
  return response.data;
};

//Get Referrals by VisitId Id
export const getByVisitId = async (visitId) => {
  const response = await axiosInstance.get(`/referrals/visit/${visitId}`);
  return response.data;
};

//Get Referrals by Patient Id
export const getByPatientId = async (patientId) => {
  const response = await axiosInstance.get(`/referrals/patient/${patientId}`);
  return response.data;
};

//Get Referrals by Doctor Id
export const getByDoctorId = async (doctorId) => {
  const response = await axiosInstance.get(`/referrals/doctor/${doctorId}`);
  return response.data;
};

// Update Referrals by Id
export const updateReferral = async (id, referralData) => {
  const response = await axiosInstance.put(`/referrals/${id}`, referralData);
  return response.data;
};

//Delete Referral by Id
export const deleteReferral = async (id) => {
  const response = await axiosInstance.delete(`/referrals/${id}`);
  return response.data;
};
