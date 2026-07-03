import axiosInstance from "../api/axiosConfig";

// Add Receptionist
export const addReceptionist = async (receptionistData) => {
  const response = await axiosInstance.post("/receptionists", receptionistData);
  return response.data;
};

// Get all Receptionists
export const getReceptionists = async (page = 0, size = 10, search = "") => {
  const response = await axiosInstance.get("/receptionists", {
    params: { page, size, search },
  });
  return response.data;
};

//Get Receptionist by Id
export const getReceptionistById = async (id) => {
  const response = await axiosInstance.get(`/receptionists/${id}`);
  return response.data;
};

//Get Receptionist by Doctor Id
// export const getByDoctorId = async (id) => {
//   const response = await axiosInstance.get(`/doctors/${id}`);
//   return response.data;
// };

// change password
export const changeReceptionistPassword = async (id, password) => {
  const response = await axiosInstance.put(
    `/receptionists/${id}/change-password`,
    password,
  );

  return response.data;
};

// Update Receptionist by Id
export const updateReceptionist = async (id, receptionistData) => {
  const response = await axiosInstance.put(
    `/receptionists/${id}`,
    receptionistData,
  );
  return response.data;
};

//Delete Receptionist by Id
export const deleteReceptionist = async (id) => {
  const response = await axiosInstance.delete(`/receptionists/${id}`);
  return response.data;
};
