import type { AuthorSearchResponse, BookSearchResponse } from "../types/book.types";
import { privateApi } from "./axiosConfig";
import type { AuthorSearchParams, BookSearchParams, SearchBothParams } from "../types/search.types";


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
