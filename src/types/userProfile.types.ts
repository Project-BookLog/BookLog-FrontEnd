// src/types/userProfile.types.ts
export type UserProfileResponse = {
  userId: number;

  nickname: string;
  email: string;
  profileImageUrl?: string | null;

  followerCount: number;
  followingCount: number;

  completedBookCount: number; 
  booklogCount: number; 
  bookmarkCount: number;

  isFollowing: boolean; 
};