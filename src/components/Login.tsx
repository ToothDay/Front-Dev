"use client";

import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useMutation } from "react-query";
import { fetchUserInfo, postUserInfo, UserInfo } from "@/api/authService";
import { setToken } from "@/api/auth";
import { useRouter } from "next/navigation";

const Login = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  const { mutate: fetchUser } = useMutation(fetchUserInfo, {
    onSuccess: (data) => {
      setUserInfo(data);
      sendUserInfo(data);
    },
    onError: (error) => {
      console.error("Failed to fetch user info", error);
    }
  });

  const { mutate: sendUserInfo } = useMutation(postUserInfo, {
    onSuccess: (data) => {
      setToken(data);
      setIsAuthenticated(true);
      router.push("/medical");
    },
    onError: (error) => {
      console.error("Failed to send user info", error);
    }
  });

  const googleSocialLogin = useGoogleLogin({
    scope: "email profile",
    onSuccess: async (tokenRes) => {
      fetchUser(tokenRes.access_token);
    },
    onError: (errorResponse) => {
      console.error(errorResponse);
    }
  });

  const handleLoginClick = () => {
    googleSocialLogin();
  };

  return <button onClick={handleLoginClick}>구글로 로그인하기</button>;
};

export default Login;
