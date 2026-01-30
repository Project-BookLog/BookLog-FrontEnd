export interface Book {
  bookId: number;
  title: string;
  thumbnailUrl: string;
  publisherName: string;
  isbn13?: string;
  authors: string[];
  translators?: string[];
  publishedDate?: string;
}

export interface Author {
  authorId: number;
  name: string;
  profileImageUrl: string | null;
  occupation: string;
  nationality: string | null;
  biography?: string | null;
  books?: AuthorBook[]; 
}
export interface AuthorBook { 
  bookId: number;
  title: string;
  thumbnailUrl: string;
  authors: string; 
  publisherName: string;
}



export interface BookSearchResponse {
  page: number;
  size: number;
  isEnd: boolean;
  totalCount: number;
  items: Book[];
}


export interface AuthorSearchResponse {
  page: number;
  size: number;
  isEnd: boolean;
  totalCount: number;
  items: Author[];
}


export type BookStatus = "TO_READ" | "READING" | "COMPLETED" | "STOPPED";