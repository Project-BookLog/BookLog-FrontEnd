import { privateApi } from "./axiosConfig";
import type { RecommendBook } from "../types/booklogRecommend.types";

export async function getBooklogRecommendBooks(postId: number) {
  const res = await privateApi.get<RecommendBook[]>(
    `/booklogs/${postId}/recommend/books`
  );
  return res.data;
}
