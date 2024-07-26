import axiosClient from "./axiosApi/axiosClient";

export const putProfile = async (formData: any) => {
  const response = await axiosClient.put(`/api/user/profile`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return response.data;
};

export const getProfile = async () => {
  const response = await axiosClient.get(`/api/user/profile`);
  return response.data;
};
