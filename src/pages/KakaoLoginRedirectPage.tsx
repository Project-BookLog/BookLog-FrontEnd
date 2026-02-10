import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useGetOnboardingProfile } from "../hooks/queries/useGetOnboardingProfile";

export const KakaoLoginRedirectPage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { setTokens } = useAuth();
  const { refetch } = useGetOnboardingProfile();

  useEffect(() => {
    const handleKakaoLogin = async () => {
      const accessToken = params.get("accessToken");
      const refreshToken = params.get("refreshToken");

      if (!accessToken || !refreshToken) {
        console.error("카카오 토큰이 없습니다");
        navigate("/login", { replace: true });
        return;
      }

      try {

        await setTokens({ accessToken, refreshToken });
        const { data } = await refetch();

        if (data?.isCompleted) {
          navigate("/", { replace: true });
        } else {
          navigate("/onboarding", { replace: true });
        }

      } catch (e) {
        console.error("카카오 로그인 처리 실패:", e);
        navigate("/login", { replace: true });
      }
      
    }
    handleKakaoLogin();
  }, [params, setTokens, navigate, refetch]);

  return <div>로그인 처리 중...</div>;
};
