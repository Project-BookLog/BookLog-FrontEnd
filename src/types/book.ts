// 개별 책 DTO
export interface Book {
  bookId: number;
  title: string;
  thumbnailUrl: string;
  publisherName: string;
  isbn13: string;
  authors: string[];
  translators: string[];
  publishedAt: string;
}

// API 응답 전체
export interface BookResponse {
  page: number;
  size: number;
  isEnd: boolean;
  totalCount: number;
  items: Book[];
}
