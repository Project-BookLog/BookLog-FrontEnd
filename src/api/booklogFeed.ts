// src/api/booklogFeed.ts
import { privateApi } from "./axiosConfig";

type FeedParams = {
  mood?: string[];
  style?: string[];
  immersion?: string[];
};

export async function getBooklogsFeed(params?: FeedParams) {
  const res = await privateApi.get("/booklogs/feed", {
    params,
    paramsSerializer: {
      serialize: (params) => {
        const searchParams = new URLSearchParams();

        Object.entries(params ?? {}).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((v) => {
              if (v !== undefined && v !== null && v !== "") {
                searchParams.append(key, String(v));
              }
            });
          } else if (value !== undefined && value !== null && value !== "") {
            searchParams.append(key, String(value));
          }
        });

        return searchParams.toString();
      },
    },
  });

  return res.data;
}
