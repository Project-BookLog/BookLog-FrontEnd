import type { RequestLoginDto, ResponseLoginDto } from "../types/auth";
import { privateApi, publicApi } from "./axiosConfig";

export const postLogin = async (body: RequestLoginDto): Promise<ResponseLoginDto> => {
    const { data } = await publicApi.post("/auth/login", body);
    return data;
}

export const postRefreshToken = async (refreshToken: string): Promise<ResponseLoginDto> => {
    const { data } = await publicApi.post("/auth/refresh", { refreshToken });
    return data;
}

export const postLogout = async (refreshToken: string) => {
  const { data } = await privateApi.post("/auth/logout", {
    refreshToken,
  });
  return data;
};
