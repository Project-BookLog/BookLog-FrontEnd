export type BooklogTagCategory = "MOOD" | "STYLE" | "IMMERSION";

export type BooklogFeedTag = {
  tagId: number;
  name: string;
  category: BooklogTagCategory;
};

export type BooklogFeedImage = {
  imageId: number;
  imageUrl: string;
  order: number;
};

export type BooklogFeedAuthor = {
  userId: number;
  nickname: string;
  profileImageUrl: string | null;
};

export type BooklogFeedBook = {
  bookId: number;
  title: string;
  authorName: string | null;
  publisher: string;
  coverImageUrl: string;
};

export type BooklogFeedItem = {
  postId: number;
  author: BooklogFeedAuthor;
  createdAt: string; // ISO
  viewCount: number;
  bookmarkCount: number;
  bookmarkedByMe: boolean;

  book: BooklogFeedBook;
  images: BooklogFeedImage[];

  excerpt: string;
  tags: BooklogFeedTag[];
};

export type BooklogFeedResponse = {
  items: BooklogFeedItem[];
  hasNext: boolean;
};
