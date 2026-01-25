import type { BOOK_ORDER } from "../enum/book";
import type { Book } from "./book.types";

export type Library = {
  name: string;
  isPublic: boolean;
  books: Book[];
  sort: BOOK_ORDER;
};

export type LibraryTab = "ALL" | "TO_READ" | "READING" | "DONE";

export type ResponseUserBooksDto = {
  userBookId: number;
  status: string;
  progressPercent: number;
  currentPage: number;
  bookId: number;
  title: string;
  thumbnailUrl: string;
  publisherName: string;
}