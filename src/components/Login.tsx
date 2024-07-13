"use client";

import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [userInfo, setUserInfo] = useState(null);

  const googleSocialLogin = useGoogleLogin({
    scope: "email profile",
    onSuccess: async (tokenRes) => {
      console.log("success", tokenRes);
      try {
        const response = await axios.get(
          "https://www.googleapis.com/oauth2/v1/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenRes.access_token}`
            }
          }
        );
        setUserInfo(response.data);
        console.log("User Info:", response.data);
      } catch (error) {
        console.error("Failed to fetch user info", error);
      }
    },
    onError: (errorResponse) => {
      console.error(errorResponse);
    }
  });

  const handleLoginClick = () => {
    googleSocialLogin();
  };

  return <button onClick={handleLoginClick}>로그인</button>;
};

export default Login;
