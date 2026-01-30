import { create } from "zustand";
import { privateApi } from "../../../api/axiosConfig";
import type { Author, AuthorSearchResponse } from "../../../types/book.types";

interface SearchAuthorsState {
  page: number;
  size: number;
  isEnd: boolean;
  total: number;
  items: Author[];
  loading: boolean;
  error: string | null;

  searchAuthors: (
    query: string,
    page?: number,
    size?: number
  ) => Promise<void>;
}

export const useSearchAuthorsStore = create<SearchAuthorsState>((set) => ({
  page: 1,
  size: 10,
  isEnd: false,
  total: 0,
  items: [],
  loading: false,
  error: null,

  searchAuthors: async (query, page = 1, size = 10) => {
    if (!query.trim()) return;

    set({ loading: true, error: null });

    try {
      const { data } = await privateApi.get<AuthorSearchResponse>(
        "/search/authors",
        {
          params: { query, page, size },
        }
      );

      console.log("👤 [API] /search/authors", data);

      set({
        page: data.page,
        size: data.size,
        isEnd: data.isEnd,
        total: data.totalCount,
        items: data.items,
      });
    } catch (e) {
      console.error(e);
      set({ error: "작가 검색 실패" });
    } finally {
      set({ loading: false });
    }
  },
}));
