import axiosClient from "./axiosApi/axiosClient";

export const getLoginedCommunityList = async () => {
  const response = await axiosClient.get(`api/community`);
  return response.data;
};

export const PostCommunity = async (formData: any) => {
  const response = await axiosClient.post(`/community/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return response.data;
};

export const getCommunityPost = async (postId: number) => {
  const response = await axiosClient.get(`api/community/${postId}`);
  return response.data;
};
