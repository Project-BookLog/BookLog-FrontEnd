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


export interface AuthorBook {
  bookId: number;
  title: string;
  authorName: string;
  publisherName: string;
  thumbnailUrl: string | null;
  tasteInfo: {
    mood: string | null;
    style: string | null;
    immersion: string | null;
  };
}

export interface AuthorDetail {
  authorId: number;
  name: string;
  profileImageUrl: string | null;
  biography: string | null;
  books: AuthorBook[];
  profile: {
    education: string[];
    debut: string | null;
    birthDate: string | null;
    occupations: string[];
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  awards: any[];
}
