import axios, { AxiosInstance } from "axios";

export const createAxiosInstance = (): AxiosInstance => {
  return axios.create({
    baseURL: "https://swyp53.store:8443",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store"
    }
  });
};
