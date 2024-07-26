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

export type NoticeData = {
  id: number;
  userId: number;
  type: string;
  postId: number;
  postTitle: string;
  username: string;
  timestamp: string;
  read: boolean;
};

export const fetchMyPostData = async (
  pageParam: number = 0
): Promise<PostData[]> => {
  const limit = 10;
  const response = await axiosClient.get("/mypage/community/post", {
    params: {
      offset: pageParam,
      limit: limit
    }
  });
  return response.data;
};

export const fetchLikePostData = async (
  pageParam: number = 0
): Promise<PostData[]> => {
  const limit = 10;
  const response = await axiosClient.get("/mypage/community/likePost", {
    params: {
      offset: pageParam,
      limit: limit
    }
  });
  return response.data;
};

export const fetchCommentPostData = async (
  pageParam: number = 0
): Promise<PostData[]> => {
  const limit = 10;
  const response = await axiosClient.get("/mypage/community/commentPost", {
    params: {
      offset: pageParam,
      limit: limit
    }
  });
  return response.data;
};

export const fetchNoticeData = async (): Promise<NoticeData[]> => {
  const response = await axiosClient.get("/api/notifications");
  return response.data;
};

export const fetchNotice = async (id: number) => {
  const response = await axiosClient.put(`/api/notifications/${id}/read`);
  return response.data;
};
