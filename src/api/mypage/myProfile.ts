import type { ResponseMyProfileDto, UpdateProfileDto } from "../../types/myPage/user.types";
import { privateApi } from "../axiosConfig";


export const getMyProfile = async(): Promise<ResponseMyProfileDto> => {
    const { data } = await privateApi.get("/me/profile");
    return data;
}

export const updateMyProfile = async (dto: UpdateProfileDto): Promise<ResponseMyProfileDto> => {
  const { data } = await privateApi.patch("/me/profile", dto);
  return data;
};

export const updateMyProfileAvatar = async (
  file: File
): Promise<{ profileImageUrl: string }> => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await privateApi.put(
    "/me/profile/avatar",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};
