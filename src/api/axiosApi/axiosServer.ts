import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { cookies } from "next/headers";
import { createAxiosInstance } from "./axiosInstance";

const createServerAxiosInstance = (): AxiosInstance => {
  const instance = createAxiosInstance();

  const cookieStore = cookies();
  const token = cookieStore.get("jwtToken")?.value;

  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return instance;
};

const axiosServer = {
  get: <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    const instance = createServerAxiosInstance();
    return instance.get<T>(url, config);
  },
  post: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    const instance = createServerAxiosInstance();
    return instance.post<T>(url, data, config);
  },
  put: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    const instance = createServerAxiosInstance();
    return instance.put<T>(url, data, config);
  },
  delete: <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    const instance = createServerAxiosInstance();
    return instance.delete<T>(url, config);
  }
};
export default axiosServer;
