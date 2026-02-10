export interface BookDetailResponse {
  bookId: number;
  title: string;
  description: string;
  shortIntro?: string;
  thumbnailUrl: string;
  publisherName: string;
  publishedDate: string;
  isbn: string | null;
  isbn10: string | null;
  isbn13: string | null;
  detailUrl: string;

  authors: {
    authorId: number;
    name: string;
    role: "AUTHOR" | "TRANSLATOR";
    profileImageUrl: string | null;
  }[];

  aiTasteComment?: {
    title: string;
    description: string;
  };

  tasteAnalysis?: {
    mood: {
      title: string;
      description: string;
    };
    style: {
      title: string;
      description: string;
    };
    immersion: {
      title: string;
      description: string;
    };
  };

  tableOfContents?: string[];
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
