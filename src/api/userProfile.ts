// src/api/userProfile.ts
import { privateApi } from "./axiosConfig";
import type { UserProfileResponse } from "../types/userProfile.types";

type WrappedUserProfileResponse = {
  data?: UserProfileResponse | null;
};

function hasUserId(value: unknown): value is UserProfileResponse {
  return !!value && typeof value === "object" && typeof (value as UserProfileResponse).userId === "number";
}

export async function getUserProfile(userId: number): Promise<UserProfileResponse> {
  const res = await privateApi.get<UserProfileResponse | WrappedUserProfileResponse>(
    `/users/${userId}/profile`
  );

  const wrapped = res.data as WrappedUserProfileResponse;
  const innerData = wrapped?.data;
  let payload: UserProfileResponse;

  if (hasUserId(innerData)) {
    payload = innerData;
  } else if (hasUserId(res.data)) {
    payload = res.data;
  } else {
    throw new Error("Invalid user profile response: missing userId");
  }

  return payload;
}
