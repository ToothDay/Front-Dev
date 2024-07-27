import axiosClient from "./axiosApi/axiosClient";

export const getLoginedCommunityList = async ({ pageParam = 0 }) => {
  const limit = 10;
  const response = await axiosClient.get(`api/community`, {
    params: {
      offset: pageParam,
      limit: limit
    }
  });
  return { posts: response.data, nextOffset: pageParam + limit };
};

export const getLoginedKeywordCommunityList = async (
  { pageParam = 0 },
  keyword: number
) => {
  const limit = 10;
  const response = await axiosClient.get(`api/community/search/${keyword}`, {
    params: {
      offset: pageParam,
      limit: limit
    }
  });
  return { posts: response.data, nextOffset: pageParam + limit };
};

export const getKeywordCommunityList = async (
  { pageParam = 0 },
  keyword: number
) => {
  const limit = 10;
  const response = await axiosClient.get(`community/search/${keyword}`, {
    params: {
      offset: pageParam,
      limit: limit
    }
  });
  return { posts: response.data, nextOffset: pageParam + limit };
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

export const postLike = async (postId: number) => {
  const response = await axiosClient.post(`/api/community/${postId}/like`);
};

export const postComment = async (postId: number, content: string) => {
  const params = new URLSearchParams();
  params.append("content", content);
  const response = await axiosClient.post(
    `/api/community/${postId}/comment`,
    params,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  );
};

export const delComment = async (commentId: number) => {
  const response = await axiosClient.get(`/api/community/post/${commentId}`);
};

export const delPost = async (postId: number) => {
  const response = await axiosClient.delete(`/api/community/${postId}`);
};

export const updatePost = async ({ formData, postId }: any) => {
  const response = await axiosClient.put(`/api/community/${postId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return response.data;
};
