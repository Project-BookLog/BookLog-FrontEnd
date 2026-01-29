import { create } from "zustand";
import { privateApi } from "../../../api/axiosConfig";
import type { Book, BookSearchResponse } from "../../../types/book.types";

interface SearchBooksState {
  page: number;
  size: number;
  isEnd: boolean;
  total: number;
  items: Book[];
  loading: boolean;
  error: string | null;

  searchBooks: (
    keyword: string,
    params?: {
      page?: number;
      size?: number;
      sort?: string;
    }
  ) => Promise<void>;

  
  clear: () => void;
}

export const useSearchBooksStore = create<SearchBooksState>((set) => ({
  page: 1,
  size: 10,
  isEnd: false,
  total: 0,
  items: [],
  loading: false,
  error: null,

 
  searchBooks: async (
    keyword,
    { page = 1, size = 10, sort = "latest" } = {}
  ) => {
    if (!keyword || !keyword.trim()) return;

    set({ loading: true, error: null });

    try {
      const { data } = await privateApi.get<BookSearchResponse>(
        "/search/books",
        {
          params: {
            query: keyword,
            page,
            size,
            sort,
          },
        }
      );

      // console.log("[API] /search/books response:", data);

      set({
        page: data.page,
        size: data.size,
        isEnd: data.isEnd,
        total: data.totalCount,
        items: data.items,
      });
    } catch (e) {
      console.error(" /search/books error:", e);
      set({ error: "도서 검색 실패" });
    } finally {
      set({ loading: false });
    }
  },

  clear: () =>
    set({
      page: 1,
      size: 10,
      isEnd: false,
      total: 0,
      items: [],
      loading: false,
      error: null,
    }),
}));
