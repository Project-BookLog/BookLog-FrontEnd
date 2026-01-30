export type RequestLoginDto = {
    email: string;
    password: string;
};

export type ResponseLoginData = {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
};

export type ResponseLoginDto = {
  success: boolean;
  code: string;
  message: string;
  data?: ResponseLoginData | null;
};

export type ResponseMyInfoDto = {
    userId: number;
    nickname: string;
    profileImageUrl: string;
    isShelfPublic: boolean;
    isBooklogPublic: boolean;
};