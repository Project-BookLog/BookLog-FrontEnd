export type User = { //목업
  id: string;
  name: string;
  email: string;
  followerCount: number;
  followingCount: number;
  finishedCount: number;
  booklogCount: number;
  bookmarkCount: number;
};

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
