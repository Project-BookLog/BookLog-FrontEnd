import { BOOK_ORDER } from "../enum/book";

type SortableBook = {
  createdAt?: string;
  author?: string;
  authors?: string[];
};

export function sortBooks<T extends SortableBook>(
  books: T[],
  order: BOOK_ORDER
): T[] {
  const sorted = [...books];

  switch (order) {
    case BOOK_ORDER.LATEST:
      return sorted.sort((a, b) => {
        if (!a.createdAt || !b.createdAt) return 0;
        return (
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
        );
      });

    case BOOK_ORDER.OLDEST:
      return sorted.sort((a, b) => {
        if (!a.createdAt || !b.createdAt) return 0;
        return (
          new Date(a.createdAt).getTime() -
          new Date(b.createdAt).getTime()
        );
      });

    case BOOK_ORDER.AUTHOR:
      return sorted.sort((a, b) => {
        const authorA =
          a.author ?? a.authors?.[0] ?? "";
        const authorB =
          b.author ?? b.authors?.[0] ?? "";
        return authorA.localeCompare(authorB);
      });

    default:
      return sorted;
  }
}
