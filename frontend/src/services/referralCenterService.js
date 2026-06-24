import axiosInstance from "../api/axiosConfig";

// Add ReferralCenter
export const addReferralCenter = async (referralCenterData) => {
  const response = await axiosInstance.post(
    "/referral-centers",
    referralCenterData,
  );
  return response.data;
};

// Get all ReferralCenters
export const getReferralCenters = async () => {
  const response = await axiosInstance.get("/referral-centers");
  return response.data;
};

//Get ReferralCenter by Id
export const getReferralCenter = async (id) => {
  const response = await axiosInstance.get(`/referral-centers/${id}`);
  return response.data;
};

//Get ReferralCenter by Doctor Id
// export const getByDoctorId = async (id) => {
//   const response = await axiosInstance.get(`/referral-centers/doctor/${id}`);
//   return response.data;
// };

// Update ReferralCenter by Id
export const updateReferralCenter = async (id, referralCenterData) => {
  const response = await axiosInstance.put(
    `/referral-centers/${id}`,
    referralCenterData,
  );
  return response.data;
};

//Delete ReferralCenter by Id
export const deleteReferralCenter = async (id) => {
  const response = await axiosInstance.delete(`/referral-centers/${id}`);
  return response.data;
};
