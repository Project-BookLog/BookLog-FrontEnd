import axios, { type AxiosInstance, type AxiosError, type AxiosResponse } from 'axios';
import { LOCAL_STORAGE_KEY } from '../constants/key';

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