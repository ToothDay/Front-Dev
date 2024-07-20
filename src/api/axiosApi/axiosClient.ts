import Cookies from "js-cookie";
import { createAxiosInstance } from "./axiosInstance";
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const axiosClient = createAxiosInstance();

axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = Cookies.get("jwtToken");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError): Promise<AxiosError> => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/welcome/login";
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
