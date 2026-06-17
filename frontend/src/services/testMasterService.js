import axiosInstance from "../api/axiosConfig";

// Add Test Master
export const addTestMaster = async (testMasterData) => {
  const response = await axiosInstance.post("/test-masters", testMasterData);
  return response.data;
};

// Get all Test Masters
export const getTestMasters = async () => {
  const response = await axiosInstance.get("/test-masters");
  return response.data;
};

//Get Test Master by Id
export const getTestMaster = async (id) => {
  const response = await axiosInstance.get(`/test-masters/${id}`);
  return response.data;
};

//Get Test Master by Doctor Id
// export const getByDoctorId = async (id) => {
//   const response = await axiosInstance.get(`/test-masters/doctor/${id}`);
//   return response.data;
// };

// Update Test Master by Id
export const updateTestMaster = async (id, testMasterData) => {
  const response = await axiosInstance.put(
    `/test-masters/${id}`,
    testMasterData,
  );
  return response.data;
};

//Delete Test Master by Id
export const deleteTestMaster = async (id) => {
  const response = await axiosInstance.delete(`/test-masters/${id}`);
  return response.data;
};
