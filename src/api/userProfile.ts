// src/api/userProfile.ts
import { privateApi } from "./axiosConfig";
import type { UserProfileResponse } from "../types/userProfile.types";

type WrappedUserProfileResponse = {
  data?: UserProfileResponse;
};

export async function getUserProfile(userId: number): Promise<UserProfileResponse> {
  const res = await privateApi.get<UserProfileResponse | WrappedUserProfileResponse>(
    `/users/${userId}/profile`
  );

  const payload = (res.data as WrappedUserProfileResponse)?.data ?? (res.data as UserProfileResponse);

  return payload;
}
