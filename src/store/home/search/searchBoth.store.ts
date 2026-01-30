import { create } from "zustand";
import { privateApi } from "../../../api/axiosConfig";
import type {
  Book,
  Author,
  BookSearchResponse,
  AuthorSearchResponse,
} from "../../../types/book.types";

interface SearchBothState {
  keyword: string;

  bookTotal: number;
  bookItems: Book[];

  authorTotal: number;
  authorItems: Author[];

  loading: boolean;
  error: string | null;

  setKeyword: (keyword: string) => void;
  searchBoth: (params?: {
    book?: {
      page?: number;
      size?: number;
      sort?: string;
    };
    author?: {
      page?: number;
      size?: number;
    };
  }) => Promise<void>;
}

export const useSearchBothStore = create<SearchBothState>((set, get) => ({
  keyword: "",

  bookTotal: 0,
  bookItems: [],

  authorTotal: 0,
  authorItems: [],

  loading: false,
  error: null,

  setKeyword: (keyword) => set({ keyword }),

  searchBoth: async (params) => {
    const { keyword } = get();
    if (!keyword.trim()) return;

    set({ loading: true, error: null });

    try {
      const [
        bookRes,
        authorRes,
      ] = await Promise.all([
        privateApi.get<BookSearchResponse>("/search/books", {
          params: {
            query: keyword,
            page: params?.book?.page ?? 1,
            size: params?.book?.size ?? 3, 
            sort: params?.book?.sort ?? "latest",
          },
        }),
        privateApi.get<AuthorSearchResponse>("/search/authors", {
          params: {
            query: keyword,
            page: params?.author?.page ?? 1,
            size: params?.author?.size ?? 5, 
          },
        }),
      ]);

      // console.log("[API] /search/books (both)", bookRes.data);
      // console.log("[API] /search/authors (both)", authorRes.data);

      set({
        bookTotal: bookRes.data.totalCount,
        bookItems: bookRes.data.items,

        authorTotal: authorRes.data.totalCount,
        authorItems: authorRes.data.items,
      });
    } catch (e) {
      console.error("searchBoth error:", e);
      set({ error: "통합 검색 실패" });
    } finally {
      set({ loading: false });
    }
  },
}));
