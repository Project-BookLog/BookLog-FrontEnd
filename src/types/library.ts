import type { BOOK_ORDER } from "../enum/book";
import type { Book } from "./book.types";

export type Library = {
  name: string;
  isPublic: boolean;
  books: Book[];
  sort: BOOK_ORDER;
};