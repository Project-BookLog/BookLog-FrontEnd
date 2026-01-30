type CommonResponse<T> = {
  success: boolean;
  code: string;
  message: string;
  data?: T;
};

export type RequestLoginDto = {
  email: string;
  password: string;
};

export type ResponseLoginDto = CommonResponse<{
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
}>;

export type ResponseMyInfoDto = {
  userId: number;
  nickname: string;
  profileImageUrl: string;
  isShelfPublic: boolean;
  isBooklogPublic: boolean;
};