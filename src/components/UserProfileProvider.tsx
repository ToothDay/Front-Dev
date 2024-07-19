"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile, UserProfile } from "@/api/authService";
import { useUserStore } from "@/stores/user";
import Loading from "@/app/loading";
import Error from "./error/Error";
import { useAuthStore } from "@/stores/Auth";
import Cookies from "js-cookie";

const UserProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const { token, setToken } = useAuthStore();
  const { setUserProfile } = useUserStore();

  useEffect(() => {
    if (!token) {
      const cookieToken = Cookies.get("jwtToken");
      if (cookieToken) {
        setToken(cookieToken);
      }
    }
  }, [token, setToken]);

  const { data, error, isLoading } = useQuery<UserProfile, Error>({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
    enabled: !!token
  });

  useEffect(() => {
    if (data) {
      const profile = {
        id: data.id,
        email: data.email,
        profileImageUrl: data.profileImageUrl,
        username: data.username
      };
      setUserProfile(profile);
    }
  }, [data, setUserProfile]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error errorType={"error"} />;
  }

  return <>{children}</>;
};

export default UserProfileProvider;
