
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

export const KakaoLoginRedirectPage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const { setItem: setAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const { setItem: setRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  useEffect(() => {
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");

    if (accessToken && refreshToken) {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);

  return <div>로그인 처리 중...</div>;
};
