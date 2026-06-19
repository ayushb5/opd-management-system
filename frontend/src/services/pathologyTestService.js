import axiosInstance from "../api/axiosConfig";

// Add Pathology Test
export const addPathologyTest = async (pathologyTestData) => {
  const response = await axiosInstance.post(
    "/pathology-tests",
    pathologyTestData,
  );
  return response.data;
};

// Get all Pathology Tests
export const getPathologyTests = async () => {
  const response = await axiosInstance.get("/pathology-tests");
  return response.data;
};

//Get Pathology Test by Id
export const getPathologyTest = async (id) => {
  const response = await axiosInstance.get(`/pathology-tests/${id}`);
  return response.data;
};

// Get Pathology Test by Visit Id
export const getByVisitId = async (id) => {
  const response = await axiosInstance.get(`/pathology-tests/visit/${id}`);
  return response.data;
};

// Get Pathology Test by Test Master Id
export const getByTestMasterId = async (id) => {
  const response = await axiosInstance.get(
    `/pathology-tests/test-master/${id}`,
  );
  return response.data;
};

// Update Pathology Test by Id
export const updatePathologyTest = async (id, pathologyTestData) => {
  const response = await axiosInstance.put(
    `/pathology-tests/${id}`,
    pathologyTestData,
  );
  return response.data;
};

//Delete Pathology Test by Id
export const deletePathologyTest = async (id) => {
  const response = await axiosInstance.delete(`/pathology-tests/${id}`);
  return response.data;
};
