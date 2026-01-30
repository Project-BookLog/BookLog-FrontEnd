import type { Author, Book } from "./book.types";


export interface BookSearchParams {
  query: string;
  page?: number;
  size?: number;
  sort?: string;
}
export interface BookSearchRequest extends BookSearchParams {
  loadMore?: boolean;
}


export interface AuthorSearchParams {
  query: string;
  page?: number;
  size?: number;
}
export interface AuthorSearchRequest extends AuthorSearchParams {
  loadMore?: boolean;
}

export interface SearchBothParams {
  book?: {
    page?: number;
    size?: number;
    sort?: string;
  };
  author?: {
    page?: number;
    size?: number;
  };
}

export interface SearchContextType {
  // 책 상태
  bookPage: number;
  bookSize: number;
  bookIsEnd: boolean;
  bookTotal: number;
  bookItems: Book[];
  bookLoading: boolean;
  bookError: string | null;
  
  // 작가 상태
  authorPage: number;
  authorSize: number;
  authorIsEnd: boolean;
  authorTotal: number;
  authorItems: Author[];
  authorLoading: boolean;
  authorError: string | null;
  
  // 통합 상태
  keyword: string;
  bothLoading: boolean;
  bothError: string | null;
  

  searchBooks: (params: BookSearchParams) => Promise<void>;
  searchAuthors: (params: AuthorSearchParams) => Promise<void>;
  searchBoth: (params?: SearchBothParams) => Promise<void>;
  clearBooks: () => void;
  clearAuthors: () => void;
  clearBoth: () => void;
  setKeyword: (keyword: string) => void;
}
