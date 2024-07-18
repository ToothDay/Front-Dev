import axios from "axios";
import Cookies from "js-cookie";

const axiosTooth = axios.create({
  baseURL: "http://3.34.135.181:8000",
  headers: {
    "Content-Type": "application/json"
  }
});

axiosTooth.interceptors.request.use(
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

axiosTooth.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("jwtToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosTooth;
