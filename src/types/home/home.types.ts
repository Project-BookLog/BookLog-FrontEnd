export interface RecommendationBook {
  bookTitle: string;
  author: string;
  publisher: string;
  thumbnailUrl: string;
  moodKeyword: string;
  styleKeyword: string;
  immersionKeyword: string;
}

export interface RecommendationSection {
  title: string;
  description: string;
  books: RecommendationBook[];
}

export interface RecommendationResponse {
  authorSection: RecommendationSection;
  genreSection: RecommendationSection;
  moodSection: RecommendationSection;
}


export interface CurrentReadingBook {
  userBookId: number;
  title: string;
  thumbnailUrl: string | null;
  authorName: string;
  publisherName: string;
  progressPercent: number;
}

export interface RealTimeRankingBook {
  bookId: number;
  title: string;
  author: string | null;
  publisher: string | null;
  coverImageUrl: string | null;
  ranking: number;
}

export interface BestsellerBook {
  bookId: number;
  title: string;
  author: string | null;
  publisher: string | null;
  coverImageUrl: string | null;
  ranking: number | null;
}

export interface BestsellerSection {
  tagName: string;
  books: BestsellerBook[];
}


export interface HomeResponse {
  realTimeRanking: {
    sectionTitle: string;
    rankings: RealTimeRankingBook[];
  };
  moodBestsellers: BestsellerSection[];
  writingStyleBestsellers: BestsellerSection[];
  immersionBestsellers: BestsellerSection[];
}
