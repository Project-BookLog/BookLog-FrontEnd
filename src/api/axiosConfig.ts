import axios, { type AxiosInstance, type AxiosError, type AxiosResponse } from 'axios';
import { useLocalStorage } from '../hooks/useLocalStorage';
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
    const {getItem} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const accessToken = getItem(); 

    if(accessToken) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${accessToken}`;
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