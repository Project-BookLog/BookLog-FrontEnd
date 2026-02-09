import { privateApi } from "../axiosConfig";
import type { BookDetailResponse } from '../../types/home/detail.types';

export const getBookDetail = async (bookId: number) => {
  const { data } = await privateApi.get<BookDetailResponse>(
    `/books/${bookId}`
  );
  return data;
};