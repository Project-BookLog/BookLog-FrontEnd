import type { BooklogFeedResponse } from "../../types/booklog/feed.types";
import { privateApi } from "../axiosConfig";


export async function getBooklogsFeed(page = 0, size = 20) {
  const res = await privateApi.get<BooklogFeedResponse>(
    "/booklogs/feed",
    { params: { page, size } }
  );
  return res.data;
}