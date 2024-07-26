import axiosClient from "@/api/axiosApi/axiosClient";

export type PostData = {
  postId: number;
  createDate: Date;
  title: string;
  content: string;
  imageUrl: string[];
  keywords: number[];
  commentCount?: number;
  likeCount?: number;
  likedByCurrentUser?: boolean;
  user?: {
    id: number;
    username: string;
    profileImageUrl: string;
    email: string;
  };
  myComment?: string;
};

export const fetchMyPostData = async (): Promise<PostData[]> => {
  const response = await axiosClient.get("/mypage/community/post");
  return response.data;
};

export const fetchLikePostData = async (): Promise<PostData[]> => {
  const response = await axiosClient.get("/mypage/community/likePost");
  return response.data;
};

export const fetchCommentPostData = async (): Promise<PostData[]> => {
  const response = await axiosClient.get("/mypage/community/commentPost");
  return response.data;
};
