import { privateApi } from "./axiosConfig";
import type { RecommendPost } from "../types/booklogRecommendPosts.types";

export async function getBooklogRecommendPosts(postId: number) {
  const res = await privateApi.get<RecommendPost[]>(
    `/booklogs/${postId}/recommend/posts`
  );
  return res.data;
}
