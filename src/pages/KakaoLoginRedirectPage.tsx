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

      try {
        if (accessToken && refreshToken) {
          await setTokens({ accessToken, refreshToken });
        }
      } catch (e) {
        console.error("토큰 설정 실패:", e);
      } finally {
        navigate("/login", { replace: true });
      }
    }
    handleKakaoLogin();
  }, []);

  return <div>로그인 처리 중...</div>;
};
