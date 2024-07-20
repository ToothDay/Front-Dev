import axios from "axios";
import Cookies from "js-cookie";
import { axiosInstance } from "./axiosInstance";

const axiosClient = axiosInstance;

axiosClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("jwtToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      window.location.href = "/welcome/login";
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
