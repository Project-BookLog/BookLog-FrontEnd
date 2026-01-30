import axios, { type AxiosInstance, type AxiosError, type AxiosResponse } from 'axios';
import { LOCAL_STORAGE_KEY } from '../constants/key';
import { postRefreshToken } from './auth';

let refreshPromise: Promise<string> | null = null;

const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

// public Instance
export const publicApi: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 
    'Content-Type': 'application/json',
  },
});

// private Instance
export const privateApi: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 
    'Content-Type': 'application/json',
  },
});

privateApi.interceptors.request.use((config)=>{
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
    const parsedToken = accessToken ? JSON.parse(accessToken) : null;

    if(parsedToken) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${parsedToken}`;
    }

    return config;
},
(error) => Promise.reject(error),
);

// 공통 에러 인터셉터
[publicApi, privateApi].forEach((api) => {
  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      console.error(`${api === publicApi ? 'Public' : 'Private'} API 에러:`, {
        status: error.response?.status,
        message: error.message,
        url: error.config?.url,
      });
      return Promise.reject(error);
    }
  );
});

privateApi.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!refreshPromise) {
        refreshPromise = (async () => {
          const refreshToken = localStorage.getItem(
            LOCAL_STORAGE_KEY.refreshToken
          )?.replace(/"/g, "");

          if (!refreshToken) throw new Error("No refresh token");

          const result = await postRefreshToken(refreshToken);

          localStorage.setItem(
            LOCAL_STORAGE_KEY.accessToken,
            JSON.stringify(result.data!.accessToken)
          );
          localStorage.setItem(
            LOCAL_STORAGE_KEY.refreshToken,
            JSON.stringify(result.data!.refreshToken)
          );

          return result.data!.accessToken;
        })()
          .catch(() => {
            localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
            localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
            window.location.href = "/login";
            throw error;
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      const newAccessToken = await refreshPromise;
      originalRequest.headers = originalRequest.headers || {};
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return privateApi(originalRequest);
    }

    return Promise.reject(error);
  }
);
