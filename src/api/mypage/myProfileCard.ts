import { privateApi } from "../axiosConfig";
import type { UserProfileCard } from "../../types/myPage/user.types";

interface MyPageResponse {
  data: {
    profile: UserProfileCard;
  };
}

export const getMyProfileCard = async (): Promise<UserProfileCard> => {
  const res = await privateApi.get<MyPageResponse>("/me/mypage");
  return res.data.data.profile;
};