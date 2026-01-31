import type { BOOK_ORDER } from "../enum/book";
import type { Book, BookStatus } from "./book.types";

export type Library = {
  name: string;
  isPublic: boolean;
  books: Book[];
  sort: BOOK_ORDER;
};

export type LibraryTab = "ALL" | "TO_READ" | "READING" | "COMPLETED";

export type PreviewBook = {
  bookId: number;
  title: string;
  thumbnailUrl: string;
  authorName: string;
  publisherName: string;
};

export type Shelf = {
  shelfId: number;
  name: string;
  isPublic: boolean;
  setOrder: BOOK_ORDER;
  previewBooks: PreviewBook[];
}

export type UserBook = {
  userBookId: number;
  status: BookStatus;
  progressPercent: number;
  currentPage: number;
  bookId: number;
  title: string;
  thumbnailUrl: string;
  publisherName: string;
  authorName: string;
}

export type ResponseUserBooksDto = {
  totalCount: number;
  items: UserBook[];
};

export type RequestDeleteUserBooksDto = {
  ids: number[];
};

export type RequestPostShelfDto = {
  name: string;
  isPublic?: boolean;
  setOrder?: BOOK_ORDER;
};