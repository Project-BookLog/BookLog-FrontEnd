import { BOOK_ORDER } from "../enum/book";
import type { Book } from "../types/book.types";

const getTime = (date: string | Date) =>
  typeof date === "string" ? new Date(date).getTime() : date.getTime();

export const sortBooks = (
  books: Book[],
  sortOrder: BOOK_ORDER
) => {
  const booksCopy = [...books];

  switch (sortOrder) {
    case BOOK_ORDER.OLDEST:
      return booksCopy.sort(
        (a, b) => getTime(a.createdAt) - getTime(b.createdAt)
      );
    case BOOK_ORDER.LATEST:
      return booksCopy.sort(
        (a, b) => getTime(b.createdAt) - getTime(a.createdAt)
      );
    case BOOK_ORDER.TITLE:
      return booksCopy.sort((a, b) => a.title.localeCompare(b.title));
    case BOOK_ORDER.AUTHOR:
      return booksCopy.sort((a, b) => a.author.localeCompare(b.author));
    default:
      return booksCopy;
  }
};
