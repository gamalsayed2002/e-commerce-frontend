import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://e-commerce-nodejs-production-316f.up.railway.app/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosInstance;
