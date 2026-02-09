// src/api/userProfile.ts
import { privateApi } from "./axiosConfig";
import type { UserProfileResponse } from "../types/userProfile.types";

export function getUserProfile(userId: number) {
  return privateApi.get<UserProfileResponse>(`/users/${userId}/profile`);
}