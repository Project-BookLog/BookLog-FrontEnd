export interface BookDetailResponse {
  bookId: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  publisherName: string;
  publishedDate: string;
  isbn: string;
  isbn10: string;
  isbn13: string;
  detailUrl: string;
  authors: {
    authorId: number;
    name: string;
    role: "AUTHOR" | "TRANSLATOR";
    profileImageUrl: string | null;
  }[];
}

//도서상세 - 북로그
export type BookRelatedBooklogsApiResponse = {
  items: (BookRelatedBooklog & { excerpt?: string })[];
  hasNext: boolean;
};

export type BookRelatedBooklogAuthor = {
  userId: number;
  nickname: string;
  profileImageUrl: string;
  followedByMe: boolean;
};

export type BookRelatedBooklogImage = {
  imageId: number;
  imageUrl: string;
  order: number;
};

export type BookRelatedBooklogTag = {
  tagId: number;
  name: string;
  category: "MOOD" | "IMMERSION" | "STYLE";
};

export type BookRelatedBooklog = {
  postId: number;
  author: BookRelatedBooklogAuthor;
  content: string;
  images: BookRelatedBooklogImage[];
  tags: BookRelatedBooklogTag[];
  createdAt: string;
};
