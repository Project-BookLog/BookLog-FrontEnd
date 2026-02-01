import { publicApi } from "./axiosConfig";

export async function getBooklogsFeed() {
  const res = await publicApi.get("/booklogs/feed");
  return res.data;
}
