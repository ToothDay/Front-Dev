"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { fetchUserProfile } from "@/api/authService";
import { useUserStore } from "@/stores/user";
import Loading from "@/app/loading";
import Error from "./error/Error";
import { useAuthStore } from "@/stores/Auth";

const UserProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const { token, isAuthenticated } = useAuthStore();
  const { setUserProfile } = useUserStore();
  const router = useRouter();

  const { data, error, isLoading } = useQuery({
    queryKey: "userProfile",
    queryFn: fetchUserProfile,
    enabled: isAuthenticated,
    onSuccess: (data) => {
      const profile = {
        id: data.id,
        email: data.email,
        profileImageUrl: data.profileImageUrl,
        username: data.username
      };
      setUserProfile(profile);
    },
    onError: (error) => {
      console.error("Failed to fetch user profile", error);
    }
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error errorType={"error"} />;
  }

  return <>{children}</>;
};

export default UserProfileProvider;
