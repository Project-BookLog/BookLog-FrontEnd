// src/api/follow.ts
import { privateApi } from "./axiosConfig";

export type FollowToggleResponse = {
  isFollowing: boolean;
  followerCount: number;
  followingCount?: number; 
};

export function followUser(userId: number) {
  return privateApi.post<FollowToggleResponse>(`/users/${userId}/follow`);
}

export function unfollowUser(userId: number) {
  return privateApi.delete<FollowToggleResponse>(`/users/${userId}/follow`);
}