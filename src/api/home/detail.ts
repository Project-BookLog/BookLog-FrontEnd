import { privateApi } from "../axiosConfig";
import type { AuthorDetail, BookDetailResponse, BookRelatedBooklogsApiResponse } from '../../types/home/detail.types';

export const getBookDetail = async (bookId: number) => {
  const { data } = await privateApi.get<BookDetailResponse>(
    `/books/${bookId}`
  );
  return data;
};

export const getBookRelatedBooklogs = async (
  bookId: number,
  page = 0,
  size = 20
) => {
  const { data } = await privateApi.get<BookRelatedBooklogsApiResponse>(
    `/books/${bookId}/booklogs`,
    { params: { page, size } }
  );
  // console.log("### getBookRelatedBooklogs response", data);

  return {
    hasNext: data.hasNext,
   items: data.items.map(({ excerpt, ...rest }) => ({
     ...rest,
     content: excerpt ?? rest.content,
   })),
  };
};



export const getAuthorDetail = async (
  authorId: number,
  sortBy: "latest" | "oldest" = "latest"
) => {
  const { data } = await privateApi.get<AuthorDetail>(
    `/authors/${authorId}`,
    {
      params: { sortBy },
    }
  );

  return data;
};
