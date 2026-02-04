export type RecommendTag = {
  tagId: number;
  name: string;
  category: string;
};

export type RecommendBook = {
  bookId: number;
  title: string;
  authorName: string;
  publisher: string;
  coverImageUrl: string;
  tags: RecommendTag[];
};
