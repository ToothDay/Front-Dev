import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { axiosInstance } from "./axiosInstance";

const createAxiosInstance = (): AxiosInstance => {
  const instance = axiosInstance;

  const cookieStore = cookies();
  const token = cookieStore.get("jwtToken")?.value;

  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return instance;
};

const axiosServer = {
  get: (url: string, config?: AxiosRequestConfig) => {
    const instance = createAxiosInstance();
    return instance.get(url, config);
  },
  post: (url: string, data?: any, config?: AxiosRequestConfig) => {
    const instance = createAxiosInstance();
    return instance.post(url, data, config);
  },
  put: (url: string, data?: any, config?: AxiosRequestConfig) => {
    const instance = createAxiosInstance();
    return instance.put(url, data, config);
  },
  delete: (url: string, config?: AxiosRequestConfig) => {
    const instance = createAxiosInstance();
    return instance.delete(url, config);
  }
};

export default axiosServer;
