import type { AuthorBook } from "./home/detail.types";

export interface Book {
  bookId: number;
  title: string;
  thumbnailUrl: string;
  publisherName: string;
  isbn13?: string;
  authors: string[];
  translators?: string[];
  publishedDate?: string;

  tags?: string[];
}

export type UserBookDetail = {
  userBookId: number;
  status: BookStatus;
  progressPercent: number;
  currentPage: number | null;
  startDate: string | null;
  endDate: string | null;
  format: BookFormat | null;
  pageCountSnapshot: number | null;
  bookId: number;
  title: string;
  contents: string;
  thumbnailUrl: string;
  publisherName: string;
  publishedAt: string;
  kakaoUrl: string;
}

export interface Author {
  authorId: number;
  name: string;
  profileImageUrl: string | null;
  occupation: string;
  nationality: string | null;
  biography?: string | null;
  books?: AuthorBook[]; 
}

export interface BookSearchResponse {
  page: number;
  size: number;
  isEnd: boolean;
  totalCount: number;
  items: Book[];
}


export interface AuthorSearchResponse {
  page: number;
  size: number;
  isEnd: boolean;
  totalCount: number;
  items: Author[];
}

export interface RequestPatchUserBookDto {
  shelfId?: number;
  status?: BookStatus;
  format?: BookFormat;
}

export interface RequestPostUserBookDto {
  bookId: number;
  shelfId?: number;
  status?: BookStatus;
}

export type BookStatus = "TO_READ" | "READING" | "COMPLETED" | "STOPPED";

export type BookFormat = "PAPER" | "EBOOK" | "AUDIO"