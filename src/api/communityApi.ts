import axiosClient from "./axiosApi/axiosClient";

// export const getCommunityList = async () => {
//   const response = await axiosClient.get(`/community`);
//   return response.data;
// };

export const PostCommunity = async (formData: any) => {
  const response = await axiosClient.post(`/community/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return response.data;
};

export const getCommunityPost = async (postId: number) => {
  const response = await axiosClient.get(`/community/${postId}`);
  return response.data;
};
