import type { Author, Book } from "../book.types";

export interface RecentSearchKeyword {
  id: number;
  keyword: string;
  searchedAt: string;
}

export interface RecentSearchResponse {
  keywords: RecentSearchKeyword[];
}

export interface RecommendedKeyword {
  id: number;
  keyword: string;
  type: string;
  description: string;
}

export interface RecommendedSearchResponse {
  keywords: RecommendedKeyword[];
}



export interface BookSearchParams {
  query: string;
  page?: number;
  size?: number;
  sort?: string;
  loadMore?: boolean;
}

export interface AuthorSearchParams {
  query: string;
  page?: number;
  size?: number;
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
  bookPage: number;
  bookSize: number;
  bookIsEnd: boolean;
  bookTotal: number;
  bookItems: Book[];
  bookLoading: boolean;
  bookError: string | null;
  
  authorPage: number;
  authorSize: number;
  authorIsEnd: boolean;
  authorTotal: number;
  authorItems: Author[];
  authorLoading: boolean;
  authorError: string | null;
  
  keyword: string;
  bothLoading: boolean;
  bothError: string | null;
  

  searchBooks: (params: BookSearchParams) => Promise<void>;
  searchAuthors: (params: AuthorSearchParams) => Promise<void>;
  searchBoth: (keyword: string, params?: SearchBothParams) => Promise<void>;
  clearBooks: () => void;
  clearAuthors: () => void;
  clearBoth: () => void;
  setKeyword: (keyword: string) => void;
}
