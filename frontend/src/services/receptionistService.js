import axiosInstance from "../api/axiosConfig";

// Add Receptionist
export const addReceptionist = async (receptionistData) => {
  const response = await axiosInstance.post("/receptionist", receptionistData);
  return response.data;
};

// Get all Receptionists
export const getReceptionists = async () => {
  const response = await axiosInstance.get("/receptionist");
  return response.data;
};

//Get Receptionist by Id
export const getReceptionist = async (id) => {
  const response = await axiosInstance.get(`/receptionist/${id}`);
  return response.data;
};

//Get Receptionist by Doctor Id
// export const getByDoctorId = async (id) => {
//   const response = await axiosInstance.get(`/doctor/${id}`);
//   return response.data;
// };

// Update doctor by Id
export const updateReceptionist = async (id, receptionistData) => {
  const response = await axiosInstance.put(
    `/receptionist/${id}`,
    receptionistData,
  );
  return response.data;
};

//Delete doctor by Id
export const deleteReceptionist = async (id) => {
  const response = await axiosInstance.delete(`/receptionist/${id}`);
  return response.data;
};
