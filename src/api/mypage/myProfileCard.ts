import { privateApi } from "../axiosConfig";
import type { MyPageProfile } from "../../types/myPage/user.types";

interface MyPageResponse {
  data: {
    profile: MyPageProfile;
  };
}

export const getMyProfileCard = async (): Promise<MyPageProfile> => {
  const res = await privateApi.get<MyPageResponse>("/me/mypage");
  return res.data.data.profile;
};