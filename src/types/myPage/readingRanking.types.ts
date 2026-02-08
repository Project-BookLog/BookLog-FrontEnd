export interface ReadingUser {
  rank: number;
  userId: number;
  nickname: string;
  profileImageUrl: string | null;
  completedCount: number;
  readingDays: number;
}

export interface TopReadingRankingResponse {
  month: string;
  top3: ReadingUser[];
}

export interface ReadingRankingResponse {
  month: string;
  top3: ReadingUser[];
  items: ReadingUser[];
  nextCursor: number | null;
  hasNext: boolean;
}