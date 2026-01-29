import axios, { type AxiosInstance, type AxiosError, type AxiosResponse } from 'axios';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY } from '../constants/key';

// public Instance
export const publicApi: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: { 
    'Content-Type': 'application/json',
  },
});

publicApi.interceptors.request.use((config)=>{
    // const {getItem} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    // const accessToken = getItem();

    // if(accessToken) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0Iiwicm9sZSI6IlJPTEVfVVNFUiIsImVtYWlsIjoidGVzdCIsImlhdCI6MTc2OTY4MDEwOSwiZXhwIjoxNzY5Njg3MzA5fQ.IrB6iVeAzBot7lEhFO4U58XiLVH2K4wGeCHt5Ul6uk2Zo-qwfaSn5nN52Jlc-XWgFrVDIgS2mbY_sNpTE48nYw`;
    // }

    return config;
},
(error) => Promise.reject(error),
);

// 공통 에러 인터셉터
publicApi.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    console.error('Public API 에러:', {
      status: error.response?.status,
      message: error.message,
      url: error.config?.url,
    });
    return Promise.reject(error);
  }
);

