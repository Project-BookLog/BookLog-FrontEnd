// src/types/publicShelves.types.ts
import type { BOOK_ORDER } from "../enum/book";

export type PublicUserPreviewBook = {
  bookId: number;
  title: string;
  thumbnailUrl: string;
  authorName: string;
  publisherName: string;
};

export type PublicUserShelf = {
  shelfId: number;
  name: string;
  isPublic: boolean; 
  setOrder: BOOK_ORDER;
  previewBooks: PublicUserPreviewBook[];
};

export type ResponsePublicUserShelvesDto = {
  totalCount: number;
  items: PublicUserShelf[];
};