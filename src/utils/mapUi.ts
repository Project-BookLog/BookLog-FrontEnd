import type { Book } from "../types/book.types";
import type { UIBook } from "../types/ui";

export const mapBookToUIBook = (book: Book): UIBook => ({
  id: Number(book.isbn13),             
  title: book.title,
  author: book.authors.join(", "),
  publisher: book.publisherName,
  coverUrl: book.thumbnailUrl,
});
