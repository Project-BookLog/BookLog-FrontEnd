export interface UserProfileCard {
  nickname: string;
  avatarUrl: string;
  email: string;
  followerCount: number;
  followingCount: number;
  completedBookCount: number;
  myBooklogCount: number;
  bookmarkCount: number;
}

export type ResponseMyProfileDto = {
  userId: number;
  nickname: string;
  profileImageUrl: string;
  isShelfPublic: boolean;
  isBooklogPublic: boolean;
};

export interface UpdateProfileDto {
  nickname: string;
  isShelfPublic: boolean;
  isBooklogPublic: boolean;
}

