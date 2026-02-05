import type { Book } from "../types";
import type { BookUi } from "../types/book.ui";

export const mapBookApiToBook = (api: Book): BookUi => ({
  id: api.bookId,
  title: api.title,
  author: api.authors?.[0] ?? "",
  publisher: api.publisherName,
  coverUrl: api.thumbnailUrl,
});
