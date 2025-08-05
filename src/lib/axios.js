import axios from "axios";
const Development = "http://localhost:5000/api";
const Production =
  "https://e-commerce-nodejs-production-316f.up.railway.app/api";
const axiosInstance = axios.create({
  baseURL: Production,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosInstance;
