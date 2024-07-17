"use client";
import { useRouter } from "next/navigation";
import { fetchUserProfile } from "@/api/authService";
import { useUserStore } from "@/stores/user";
import { useQuery } from "react-query";
import Loading from "@/app/loading";
import Error from "./error/Error";
import Cookies from "js-cookie";

const UserProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const { setUserProfile } = useUserStore();
  const router = useRouter();

  const token = Cookies.get("jwtToken");

  if (token) {
    const { data, error, isLoading } = useQuery({
      queryKey: "userProfile",
      queryFn: fetchUserProfile,
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
  }

  return <>{children}</>;
};

export default UserProfileProvider;
