import type { RequestLoginDto, ResponseLoginDto } from "../types/auth";
import { publicApi } from "./axiosConfig";

export const postLogin = async (body: RequestLoginDto): Promise<ResponseLoginDto> => {
    const { data } = await publicApi.post("/auth/login", body);
    return data;
}

export const postRefreshToken = async (refreshToken: string): Promise<ResponseLoginDto> => {
    const { data } = await publicApi.post("/auth/refresh", { refreshToken });
    return data;
}
