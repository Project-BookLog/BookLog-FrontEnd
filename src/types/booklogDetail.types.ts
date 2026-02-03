export type BooklogAuthor = {
  userId: number;
  nickname: string;
  email: string;
  profileImageUrl: string;
  followedByMe: boolean;
};

export type BooklogBook = {
  bookId: number;
  title: string;
  authorName: string;
  publisher: string;
  coverImageUrl: string;
};

export type BooklogTag = {
  tagId: number;
  name: string;
  category: string;
};

export type BooklogImage = {
  imageId: number;
  imageUrl: string;
  order: number;
};

export type BooklogDetailResponse = {
  postId: number;
  author: BooklogAuthor;
  book: BooklogBook;
  tags: BooklogTag[];
  content: string;
  viewCount: number;
  bookmarkedByMe: boolean;
  bookmarkCount: number;
  images: BooklogImage[];
  createdAt: string; // ISO datetime
};
