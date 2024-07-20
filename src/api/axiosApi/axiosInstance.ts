import axios, { AxiosInstance } from "axios";

export const createAxiosInstance = (): AxiosInstance => {
  return axios.create({
    baseURL: "http://3.34.135.181:8000",
    headers: {
      "Content-Type": "application/json"
    }
  });
};
