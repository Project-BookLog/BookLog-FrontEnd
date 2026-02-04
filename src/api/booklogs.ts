import { privateApi } from "./axiosConfig";
import type { BooklogDetailResponse } from "../types/booklogDetail.types";

export const getBooklogDetail = async (postId: number) => {
  const res = await privateApi.get<BooklogDetailResponse>(
    `/booklogs/${postId}`
  );
  return res.data;
};
