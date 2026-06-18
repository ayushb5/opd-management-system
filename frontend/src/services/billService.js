import axiosInstance from "../api/axiosConfig";

// Add Bill
export const addBill = async (billData) => {
  const response = await axiosInstance.post("/bills", billData);
  return response.data;
};

// Get all Bills
export const getBills = async () => {
  const response = await axiosInstance.get("/bills");
  return response.data;
};

//Get Bill by Id
export const getBill = async (id) => {
  const response = await axiosInstance.get(`/bills/${id}`);
  return response.data;
};

// Get Bills by Visit Id
export const getByVisitId = async (id) => {
  const response = await axiosInstance.get(`/bills/visit/${id}`);
  return response.data;
};

// Update Bill by Id
export const updateBill = async (id, billData) => {
  const response = await axiosInstance.put(`/bills/${id}`, billData);
  return response.data;
};

//Delete Bill by Id
export const deleteBill = async (id) => {
  const response = await axiosInstance.delete(`/bills/${id}`);
  return response.data;
};
