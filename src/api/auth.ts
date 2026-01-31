import type { RequestLoginDto, ResponseLoginDto, ResponseMyInfoDto } from "../types/auth";
import { privateApi, publicApi } from "./axiosConfig";

export const postLogin = async (body: RequestLoginDto): Promise<ResponseLoginDto> => {
    const { data } = await publicApi.post("/auth/login", body);
    return data;
}

export const postRefreshToken = async (refreshToken: string): Promise<ResponseLoginDto> => {
    const { data } = await publicApi.post("/auth/refresh", { refreshToken });
    return data;
}

export const getMyInfo = async(): Promise<ResponseMyInfoDto> => {
    const { data } = await privateApi.get("/me/profile");
    return data;
}