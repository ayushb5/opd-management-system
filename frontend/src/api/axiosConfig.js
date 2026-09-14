import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://10.201.40.214:8080",
});

export default axiosInstance;
