import axiosClient from "@/api/axiosApi/axiosClient";

export type UserInfo = {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  picture: string;
};

export interface UserProfile {
  id: string;
  email: string;
  profileImageUrl: string;
  username: string;
}

export const postUserInfo = async (userInfo: UserInfo) => {
  const reqBody = {
    profileObj: {
      id: userInfo.id,
      picture: userInfo.picture,
      email: userInfo.email,
      name: userInfo.name
    }
  };
  const response = await axiosClient.post(`/oauth/jwt/google`, reqBody);
  return response.data;
};

export const fetchUserInfo = async (token: string): Promise<UserInfo> => {
  const response = await axiosClient.get(
    "https://www.googleapis.com/oauth2/v1/userinfo",
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};

export const fetchUserProfile = async (): Promise<UserProfile> => {
  const response = await axiosClient.get("/api/user/profile");
  return response.data;
};
