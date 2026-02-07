import { BOOK_ORDER } from "../enum/book";
import type { Book } from "../types";

const getTime = (date?: string | Date) => {
  if (!date) return 0;
  return typeof date === "string"
    ? new Date(date).getTime()
    : date.getTime();
};


export const sortBooks = (
  books: Book[],
  sortOrder: BOOK_ORDER
) => {
  const booksCopy = [...books];

  switch (sortOrder) {
    case BOOK_ORDER.OLDEST:
      return booksCopy.sort(
        (a, b) => getTime(a.publishedDate) - getTime(b.publishedDate)
      );
    case BOOK_ORDER.LATEST:
      return booksCopy.sort(
        (a, b) => getTime(b.publishedDate) - getTime(a.publishedDate)
      );
    case BOOK_ORDER.TITLE:
      return booksCopy.sort((a, b) => a.title.localeCompare(b.title));
    case BOOK_ORDER.AUTHOR:
      return booksCopy.sort((a, b) =>
        (a.authors[0] ?? "").localeCompare(b.authors[0] ?? "")
      );
    default:
      return booksCopy;
  }
};

