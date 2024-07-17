"use client";
import styles from "./Login.module.scss";
import { useGoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { fetchUserInfo, postUserInfo, UserInfo } from "@/api/authService";
import { setToken } from "@/api/auth";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/Auth";

type LoginProps = {
  hasToken: boolean;
};

const Login = ({ hasToken }: LoginProps) => {
  const [userInformation, setUserInformation] = useState<UserInfo | null>(null);
  const router = useRouter();
  const { setToken: setAuthToken } = useAuthStore();

  const { mutate: fetchUser } = useMutation(fetchUserInfo, {
    onSuccess: (data) => {
      setUserInformation(data);
      sendUserInfo(data);
    },
    onError: (error) => {
      console.error("Failed to fetch user info", error);
    }
  });

  const { mutate: sendUserInfo } = useMutation(postUserInfo, {
    onSuccess: (data) => {
      setToken(data);
      setAuthToken(data);
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
    if (hasToken) {
      router.push("/medical");
      return;
    }
    googleSocialLogin();
  };

  return (
    <button onClick={handleLoginClick} className={styles.googleButton}>
      구글로 로그인하기
    </button>
  );
};

export default Login;
