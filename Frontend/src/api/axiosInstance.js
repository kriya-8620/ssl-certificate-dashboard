import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:6869/api/v1",
  withCredentials: false
});

export default axiosInstance;