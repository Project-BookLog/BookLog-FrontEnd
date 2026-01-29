import axios, { type AxiosInstance, type AxiosError, type AxiosResponse } from 'axios';

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
        config.headers.Authorization = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0Iiwicm9sZSI6IlJPTEVfVVNFUiIsImVtYWlsIjoidGVzdCIsImlhdCI6MTc2OTY5NzA2MywiZXhwIjoxNzY5NzA0MjYzfQ.waqxI2aDOOLmIZoUAUlfqFDpS6Qdw6rT-usPzADRpmg3Kjo1iAEVmYCZ3EiSTLWOljtAtvRAup5LDizINDeoWA`;
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

