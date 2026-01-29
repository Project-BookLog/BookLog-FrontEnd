import axios, { type AxiosInstance, type AxiosError, type AxiosResponse } from 'axios';

// public Instance
export const publicApi: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: { 
    'Content-Type': 'application/json',
  },
});


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

