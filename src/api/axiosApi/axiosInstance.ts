import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://3.34.135.181:8000",
  headers: {
    "Content-Type": "application/json"
  }
});
