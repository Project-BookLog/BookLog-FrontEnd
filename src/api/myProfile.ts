import type { ResponseMyProfileDto, UpdateProfileDto } from "../types/user.types";
import { privateApi } from "./axiosConfig";


export const getMyProfile = async(): Promise<ResponseMyProfileDto> => {
    const { data } = await privateApi.get("/me/profile");
    return data;
}

export const updateMyProfile = async (dto: UpdateProfileDto): Promise<ResponseMyProfileDto> => {
  const { data } = await privateApi.patch("/me/profile", dto);
  return data;
};