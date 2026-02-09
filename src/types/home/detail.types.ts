export interface BookDetailResponse {
  bookId: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  publisherName: string;
  publishedDate: string;
  isbn: string;
  isbn10: string;
  isbn13: string;
  detailUrl: string;
  authors: {
    authorId: number;
    name: string;
    role: "AUTHOR" | "TRANSLATOR";
    profileImageUrl: string | null;
  }[];
}