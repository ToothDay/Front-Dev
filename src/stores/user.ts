import { create } from "zustand";

type UserInfo = {
  id: string;
  email: string;
  profileImageUrl: string;
  username: string;
};

type UserInfoState = {
  userProfile: UserInfo;
  setUserProfile: (userProfile: UserInfo) => void;
};

export const useUserStore = create<UserInfoState>((set) => ({
  userProfile: {
    id: "",
    email: "",
    profileImageUrl: "",
    username: ""
  },
  setUserProfile: (userProfile: UserInfo) => {
    set({ userProfile });
  }
}));
