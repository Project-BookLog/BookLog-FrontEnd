import type { AuthorSearchResponse, BookSearchResponse } from "../../types/book.types";
import { privateApi } from "../axiosConfig";
import type { AuthorSearchParams, BookSearchParams, SearchBothParams, RecentSearchResponse, RecommendedSearchResponse } from "../../types/home/search.types";

export const saveSearchKeyword = async (keyword: string): Promise<void> => {
  if (!keyword.trim()) return;

  await privateApi.post("/search/keywords", {
    keyword,
  });
};

export const getRecentSearchKeywords = async (): Promise<RecentSearchResponse> => {
  const { data } = await privateApi.get<RecentSearchResponse>(
    "/search/recent"
  );
  return data;
};

export const deleteRecentSearchKeyword = async (keyword: string) => {
  await privateApi.delete("/search/recent", {
    params: { keyword },
  });
};

export const deleteAllRecentSearchKeywords = async () => {
  await privateApi.delete("/search/recent/all");
};

export const getRecommendedSearchKeywords = async (): Promise<RecommendedSearchResponse> => {
  const { data } = await privateApi.get<RecommendedSearchResponse>(
    "/search/recommendations"
  );
  return data;
};



export const searchAuthors = async (params: AuthorSearchParams): Promise<AuthorSearchResponse> => {
  const { data } = await privateApi.get<AuthorSearchResponse>("/search/authors", {
    params,
  });
  console.log("[API] /search/authors", data);
  return data;
};

export const searchBooks = async (params: BookSearchParams): Promise<BookSearchResponse> => {
  const { data } = await privateApi.get<BookSearchResponse>("/search/books", {
    params,
  });
  console.log("[API] /search/books response:", data);
  return data;
};

export const searchBoth = async (
  keyword: string,
  params?: SearchBothParams
): Promise<{
  book: BookSearchResponse;
  author: AuthorSearchResponse;
}> => {
  const [bookRes, authorRes] = await Promise.all([
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
  
  return {
    book: bookRes.data,
    author: authorRes.data,
  };
};


