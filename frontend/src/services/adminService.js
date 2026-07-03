import axiosInstance from "../api/axiosConfig";

//Get admin by Id
export const getAdminById = async (id) => {
  const response = await axiosInstance.get(`/admin/${id}`);
  return response.data;
};

// change password
export const changeAdminPassword = async (id, password) => {
  const response = await axiosInstance.put(
    `/admin/${id}/change-password`,
    password,
  );

  return response.data;
};

// Update admin by Id
export const updateAdmin = async (id, adminData) => {
  const response = await axiosInstance.put(`/admin/${id}`, adminData);
  return response.data;
};

//Delete admin by Id
export const deleteAdmin = async (id) => {
  const response = await axiosInstance.delete(`/admin/${id}`);
  return response.data;
};
