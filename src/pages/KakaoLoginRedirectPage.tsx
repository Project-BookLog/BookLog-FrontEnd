import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const KakaoLoginRedirectPage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { setTokens } = useAuth();

  useEffect(() => {
    const handleKakaoLogin = async () => {
      const accessToken = params.get("accessToken");
      const refreshToken = params.get("refreshToken");

      if (accessToken && refreshToken) {
        await setTokens({ accessToken, refreshToken });
      }
      navigate("/login", { replace: true });
    }
    handleKakaoLogin();
  }, []);

  return <div>로그인 처리 중...</div>;
};
