import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://10.37.49.189:8080",
});

export default axiosInstance;
