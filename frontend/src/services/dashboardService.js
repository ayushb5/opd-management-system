import axiosInstance from "../api/axiosConfig";

export const getAdminDashboard = () => {
  return axiosInstance.get("/admin/dashboard");
};

export const getDoctorDashboard = (doctorId) => {
  return axiosInstance.get(`/doctors/dashboard/${doctorId}`);
};

export const getReceptionistDashboard = () => {
  return axiosInstance.get("/receptionists/dashboard");
};
