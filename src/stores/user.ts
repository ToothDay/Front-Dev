import { create } from "zustand";
import { UserInfo } from "@/api/authService";

type UserInfoState = {
  userProfile: UserInfo;
  setUserProfile: (userProfile: UserInfo) => void;
};

export const useUserStore = create<UserInfoState>((set) => ({
  userProfile: {
    id: "",
    email: "",
    verified_email: false,
    name: "",
    given_name: "",
    picture: ""
  },
  setUserProfile: (userProfile: UserInfo) => {
    set({ userProfile });
  }
}));

useUserStore.subscribe((userInfo) => {
  console.log(userInfo);
});
