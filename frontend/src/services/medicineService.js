import axiosInstance from "../api/axiosConfig";

// Add Medicine
export const addMedicine = async (medicineData) => {
  const response = await axiosInstance.post("/medicines", medicineData);
  return response.data;
};

// Get all Medicines
export const getMedicines = async () => {
  const response = await axiosInstance.get("/medicines");
  return response.data;
};

//Get Medicine by Id
export const getMedicine = async (id) => {
  const response = await axiosInstance.get(`/medicines/${id}`);
  return response.data;
};

//Get Medicine by Doctor Id
// export const getByDoctorId = async (id) => {
//   const response = await axiosInstance.get(`/doctors/${id}`);
//   return response.data;
// };

// Update Medicine by Id
export const updateMedicine = async (id, medicineData) => {
  const response = await axiosInstance.put(`/medicines/${id}`, medicineData);
  return response.data;
};

//Delete Medicine by Id
export const deleteMedicine = async (id) => {
  const response = await axiosInstance.delete(`/medicines/${id}`);
  return response.data;
};
