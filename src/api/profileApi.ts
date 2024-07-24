import axiosClient from "./axiosApi/axiosClient";

export const putProfile = async (formData: any) => {
  const response = await axiosClient.put(`/api/user/profile`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return response.data;
};
