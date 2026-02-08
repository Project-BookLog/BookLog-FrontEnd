/* eslint-disable @typescript-eslint/no-explicit-any */
export interface RealTimeRankingBook {
  bookId: number;
  title: string;
  author: string | null;
  publisher: string | null;
  coverImageUrl: string | null;
  ranking: number;
}

export interface HomeResponse {
  realTimeRanking: {
    sectionTitle: string;
    rankings: RealTimeRankingBook[];
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  moodBestsellers: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  writingStyleBestsellers: any[];
  immersionBestsellers: any[];
}
